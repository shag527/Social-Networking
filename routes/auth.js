const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const User=mongoose.model("user")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config/keys')
const requireLogin=require("../middleware/requireLogin")

router.get('/',(req,res)=>{
    res.send("Oops nothing here :(")
})

router.get('/login',(req,res)=>{
    res.render("login");
})

router.get('/register',(req,res)=>{
    res.render("register");
})

router.get('/protected',requireLogin,(req,res)=>{
    res.send("Hi")
})


router.post('/login',(req,res)=>{
    const{username,password}=req.body
    if(!username || !password)
    {
        return res.status(422).json({error:"Please provide username or password"})
    }
    User.findOne({username:username})
    .then(savedUser=>{
        if(!savedUser)
        {
            return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch)
            {
                //res.json({message:"Successfully logged in"})
                const token=jwt.sign({id:savedUser._id},JWT_SECRET)
                res.json({token})
            }
            else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

router.post('/register',(req,res)=>{
    const {name,dob,email,username,password}=req.body
    if(!name || !dob || !email || !username || !password){
        return res.status(422).json({error:"Please add all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User with this email already exists"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user=new User({
                name,
                dob,
                email,
                username,
                password:hashedpassword
            })
            user.save()
            .then(user=>{
                res.json({message:"Saved Successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports=router
const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const User=mongoose.model("user")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const {JWT_SECRET}=require('../config/keys')
const requireLogin=require("../middleware/requireLogin")
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use(cookieParser())

router.get('/',requireLogin,(req,res)=>{
    res.render("home");
})

router.get('/login',(req,res)=>{
    res.render("login");
})

router.get('/register',(req,res)=>{
    res.render("register");
})

router.get('/logout',requireLogin,(req,res)=>{
    res.render("login");
})


router.post('/login',urlencodedParser,(req,res)=>{
    const{username,password}=req.body
    if(!username || !password)
    {
        return res.status(422).json({error:"Please provide username or password"})
    }
    User.findOne({username:username})
    .then(savedUser=>{
        if(!savedUser)
        {
            return res.status(422).json({error:"Invalid username or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch)
            {
                //res.json({message:"Successfully logged in"})
                const token=jwt.sign({id:savedUser._id},JWT_SECRET)
                const{_id,name,email}=savedUser
                res.cookie('auth-token','Bearer '+token)
                return res.redirect('/')
            }
            else{
                return res.status(422).json({error:"Invalid username or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

router.post('/register',urlencodedParser,(req,res)=>{
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
                return res.redirect('/login')
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
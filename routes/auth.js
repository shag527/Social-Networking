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
const nodemailer=require('nodemailer')
const crypto=require('crypto')
const sendgridTransport=require('nodemailer-sendgrid-transport')
const {SENDGRID_API}=require("../config/keys")

const transporter=nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:SENDGRID_API
    }
}))

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
    try{
        res.clearCookie("auth-token");
        res.render("login");
    }catch(error){
        res.status(500).send(error)
    }
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
                const{_id,name,email,followers,following}=savedUser
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
                transporter.sendMail({
                    to:user.email,
                    from:"185027@nith.ac.in",
                    subject:"Signup Success",
                    html:"<h2>Welcome to Coffee!!</h2><h4>Let talk over a cup of coffee.</h4>"
                })
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

router.post('/reset-password',requireLogin,(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token=buffer.toString("hex")
        user.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User don't exist with this email"})
            }
            user.resetToken=token
            user.expireToken=Date.now()+3600000
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"185027@nith.ac.in",
                    subject:"Password Reset",
                    html:'<p>You requested for password reset</p>Click this <a href="http://localhost:3000/reset/${token}" >link</a> to reset your password'
                })
                res.json({message:"Check your email for further instructions"})
            })
        })
    })
})

router.post('/new-password',(req,res)=>{
    const newPassword=req.body.password
    const sentToken=req.body.token
    user.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Session Expired. Try Again."})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
            user.password=hashedpassword
            user.resetToken=undefined
            user.expireToken=undefined
            user.save().then((savedUser)=>{
                res.json({message:"Password Updated Successfully"})
            })
        })
    }).catch(err=>{
        console.log(err)
    })
})

module.exports=router
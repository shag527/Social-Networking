const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const Chatroom=  mongoose.model("Chatroom")
const bodyParser = require("body-parser")

router.post('/chat', requireLogin,async(req,res)=>{
    const {chatroomName}=req.body
   
    const nameRegex=/^[A-Za-z\s]+$/
    if(!nameRegex.test(chatroomName))
    return res.status(422).json({error:"Chatroom name can only contain alphabets"})
    
    const chatroomExists=await Chatroom.findOne({chatroomName})
    if(chatroomExists)
    return res.status(422).json({error:"Chatroom with this name already exists"})
    
    const chatroom=new Chatroom({
        name:chatroomName
    })
  
    chatroom.save();
    res.json({
        message:"Chatroom Created"
    })
})

router.get('/chat',requireLogin,async(req,res)=>{
    const chatrooms= await Chatroom.find({})
    res.json(chatrooms)
})



module.exports = router
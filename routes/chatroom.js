const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const Chatroom=  mongoose.model("Chatroom")
const Message=  mongoose.model("Message")
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

router.post('/allmessages',requireLogin,async(req,res)=>{
    const {chatroomId}=req.body
    await Message.find({chatroom:chatroomId})
    .populate("user","name")
    .populate("chatroom","name")
    .then(allmessages=>{
        res.json({allmessages})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/chatroomname',requireLogin,async(req,res)=>{
    const chatroomname=await Chatroom.find({chatroom:req.body.roomId})
    res.json(chatroomname)
})



module.exports = router

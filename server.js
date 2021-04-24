var express=require("express");
var app=express();
const {JWT_SECRET} = require('../Social-Networking/config/keys')

const cors = require('cors');
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const {MONGOURI}=require("./config/keys")
var mongodb=require("mongoose");
mongodb.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongodb.connection.on('connected',()=>{
    console.log("Database Connected")
})
mongodb.connection.on('error',(err)=>{
    console.log("Error Connecting database",err)
})

require('./models/user') 
require('./models/post')
require('./models/Chatroom')
require('./models/Message')

app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/post"))
app.use(require("./routes/user"))
app.use(require("./routes/chatroom"))

const mongoose=require('mongoose')
const Message=mongoose.model("Message")
const User=mongoose.model("user")

const customMiddleware=(req,res,next)=>{
    next()
}

app.use(customMiddleware)

var bcrypt=require("bcrypt");
var filesystem=require("fs");

var jwt=require("jsonwebtoken");
const { Socket } = require("dgram");
const { Mongoose } = require("mongoose");
var accessTokenSecret="myAccessTokenSecret1234567890";

app.use(express.static(__dirname + '/public'));
app.set("view engine","ejs");

const PORT = process.env.PORT || 3001;
const server=app.listen(PORT,function(){
    console.log("Server Started at http://localhost:3001");
});

const io=require("socket.io")(server,{
    cors:{
        origin:'*'
    }
});


io.on('connection', function(socket){  
    const id=socket.handshake.query.token;
    ID=id.slice(1,-1)
    socket.userId=ID
    

    console.log('Connected '+socket.userId);  
    
    socket.on('disconnect', function(){
       console.log('Disconnected '+socket.userId); 
    });

    socket.on("joinRoom",({chatroomId})=>{
        socket.join(chatroomId)
        console.log("User with ID "+chatroomId+" joined chatroom")
    })

    socket.on("leaveRoom",({chatroomId})=>{
        socket.leave(chatroomId)
        console.log("User with ID "+chatroomId+" left chatroom")
    })

    socket.on("chatroomMessage",async({chatroomId,message})=>{
        if(message.trim().length>0){
            const user=await User.findOne({_id:socket.userId})
            const newMessage=new Message({
                chatroom: chatroomId,
                user:socket.userId,
                message
            })
            io.to(chatroomId).emit("newMessage",{
                message,
                name:user.name,
                userId:socket.userId
            })

            await newMessage.save()
        }
    })
});


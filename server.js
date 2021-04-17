var express=require("express");
var app=express();

const cors = require('cors');
app.use(cors({ origin: true }));

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

app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/post"))
app.use(require("./routes/user"))

const customMiddleware=(req,res,next)=>{
    next()
}

app.use(customMiddleware)

var http=require("http").createServer(app);
var bcrypt=require("bcrypt");
var filesystem=require("fs");

var jwt=require("jsonwebtoken");
const { Socket } = require("dgram");
const { Mongoose } = require("mongoose");
var accessTokenSecret="myAccessTokenSecret1234567890";

app.use(express.static(__dirname + '/public'));
app.set("view engine","ejs");

var socketIO=require("socket.io")(http);
var socketID="";
var users=[];

var mainURL="http://localhost:3000";

socketIO.on("connection",function(socket){
    console.log("User Connected",socket.id);
    socketID=Socket.id;
});

const PORT = process.env.PORT || 3001;
app.listen(PORT,function(){
    console.log("Server Started at http://localhost:3001");
});

app.use((req,res, next)=>{
    res.setHeader('Access-Control-Allow-Origin',"http://localhost:3000");
    res.setHeader('Access-Control-Allow-Headers',"*");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
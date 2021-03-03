var express=require("express");
var app=express();

var formidable=require("express-formidable");
app.use(formidable());

var mongodb=require("mongodb");
var mongocClient=mongodb.mongocClient;
var objectId=mongodb.objectId;

var http=require("http").createServer(app);
var bcrypt=require("bcrypt");
var filesystem=require("fs");

var jwt=require("jsonwebtoken");
const { Socket } = require("dgram");
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

http.listen(3000,function(){
    console.log("Server Started");

    mongodb.MongoClient.connect("mongodb://localhost:27017",{useUnifiedTopology: true },function(error,client){
        if(error) return console.log(error);
        var database=client.db("my_social_network");
        console.log("Database Connected");

        app.get("/login",function(request,result){
            result.render("login");
        });
    });
});
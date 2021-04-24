const mongoose=require('mongoose')

const chatroomSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

mongoose.model("Chatroom",chatroomSchema)
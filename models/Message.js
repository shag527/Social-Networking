const mongoose=require('mongoose')

const messageSchema=new mongoose.Schema({
    chatroom:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Chatroom"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    message:{
        type:String,
        required:true
    }
})

mongoose.model("Message",messageSchema)
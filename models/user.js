const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile_pic:{
        typr:String,
        default:""
    },
    followers:[{
        type:ObjectId,
        ref:"user"
    }],
    following:[{
        type:ObjectId,
        ref:"user"
    }]
})

mongoose.model("user",userSchema)
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
    resetToken:String,
    expireToken:Date,
    photo:{
        type:String,
        default:"https://res.cloudinary.com/fierce-citadel/image/upload/v1618863923/no_pic_j6yvol.jpg"
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
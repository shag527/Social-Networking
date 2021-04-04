const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:Date,
        required:true
    },
    photo:{
        type:String,
        default:"no photo"
    },
    likes:[{
        type:ObjectId,
        ref:"user"
    }],
    postedBy:{
        type:ObjectId,
        ref:"user"
    }
})

mongoose.model("post",postSchema)
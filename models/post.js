const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{ 
        type:String,
        default:""
    },
    photo:{
        type:String,
        default:"no photo"
    },
    likes:[{
        type:ObjectId,
        ref:"user"
    }],
    comments:[{
        text:String,
        postedBy:{
            type:ObjectId,
            ref:"user"
        }
    }],
    postedBy:{
        type:ObjectId,
        ref:"user"
    }
},
{timestamps:true})

mongoose.model("Post",postSchema)
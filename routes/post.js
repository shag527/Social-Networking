const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const requireLogin=require("../middleware/requireLogin")
const post=mongoose.model("post")

router.get('/allpost',(req,res)=>{
    post.find()
    .populate("postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body}=req.body
    if(!title||!body)
    {
        res.status(422).json({error:"Please add all the fields"})
    }
    req.user.password=undefined
    const post=new post({
        title,
        body,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get("/myposts",requireLogin,(req,res)=>{
    post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.put("/like",requireLogin,(req,res)=>{
    post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.put("/unlike",requireLogin,(req,res)=>{
    post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.put("/comment",requireLogin,(req,res)=>{
    const comment={
        text:req.body.text,
        postedBy:req.user
    } 
    post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comments}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

module.exports=router
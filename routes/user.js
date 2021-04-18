const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const requireLogin=require("../middleware/requireLogin")
const post=mongoose.model("Post")
const user=mongoose.model("user")

router.get('/user/:id',requireLogin,(req,res)=>{
    user.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        post.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((err,posts)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({user,posts})
        })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})

router.put("/follow",requireLogin,(req,res)=>{
    user.findByIdAndUpdate(req.body.followId),{
    $push:{followers:req.user._id}
},{
    new:true
},(err,result=>{
    if(err){
        return res.status(422).json({error:err})
    }
    user.findByIdAndUpdate(req.user._id,{
        $push:{following:req.body.followId}
    },{new:true})
    .then(result=>{
        res.json(result)
    }).catch(err=>{
        return res.status(422).json({error:err})
    })
    })
})

router.put("/unfollow",requireLogin,(req,res)=>{
    user.findByIdAndUpdate(req.body.unfollowId),{
    $pull:{followers:req.user._id}
},{
    new:true
},(err,result=>{
    if(err){
        return res.status(422).json({error:err})
    }
    user.findByIdAndUpdate(req.user._id,{
        $pull:{following:req.body.unfollowId}
    },{new:true})
    .then(result=>{
        res.json(result)
    }).catch(err=>{
        return res.status(422).json({error:err})
    })
    })
})

router.put('/updatepic',requireLogin,(req,res)=>{
    user.findByIdAndUpdate(req.user._id,{
        $set:{pic:req.body.pic}},{new:true},
        (err,result)=>{
        if(err){
            return res.status(422).json({error:"Cannot post Picture"})
        }
        res.json(result)
    })
})

router.post('/search-users',(req,res)=>{
    let userPattern=new RegExp("^"+req.body.query)
    user.find({email:{$regex:userPattern}})
    .select("_id email")
    .then(user=>{
        res.json(user)
    }).catch(err=>{
        console.log(err)
    })
})

module.exports=router
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const mongoose = require('mongoose')
const User = mongoose.model("user")
module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    //authorization === Bearer ewefwegwrherhe
    if(!authorization){
       return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    if(!token){
        res.status(401).json({error:"You must be logged in"})
    }
    const user=jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err)
        {
            res.status(401).json({error:"You must be logged in"})
        }
        const { id}=payload
        User.findById( id).then(userdata=>{
            req.user=userdata
            req.token=token
            next()
        })
    })
}
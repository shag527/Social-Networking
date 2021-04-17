import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signup = ()=>{
    const history=useHistory()
    const [username,setUsername] = useState("")
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [dob,setDate] = useState("")
    const [password,setPassword] = useState("")

    const PostData= ()=>{
        if(!username||!name||!email||!dob||!password)
        {
            M.toast({html:"Please add all the fields"})
            return 
        }
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Invalid Email"})
            return 
        }
        fetch("/register",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username,
                name,
                email,
                dob,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error})
            }
            else{
                M.toast({html:data.message})
                history.push("/signin")
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2>Coffee</h2>
                
                <input type="text" placeholder="User Name" name="username"
                value = {username}
                onChange = {(e)=>setUsername(e.target.value)}
                required />
                <input type="text" placeholder="Name" name="name"
                value = {name}
                onChange = {(e)=>setName(e.target.value)}
                required />
                <input type="email" placeholder="Email" name="email" 
                value = {email}
                onChange = {(e)=>setEmail(e.target.value)}
                required />
                <input type="date" placeholder="Date of Birth" name="dob" 
                value = {dob}
                onChange = {(e)=>setDate(e.target.value)}
                required />
                <input type="password" placeholder="Password" name="password" autocomplete="new-password" 
                value = {password}
                onChange = {(e)=>setPassword(e.target.value)}
                required />
                <center><button className="btn btn-block btn-primary" onClick={()=>PostData()}>Register</button></center>
            </div>

        </div>
    )

}
export default Signup
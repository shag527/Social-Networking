import React,{useState} from 'react'
import {Link} from 'react-router-dom'

const Signup = ()=>{
    const [username,setUsername] = useState("")
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [date,setDate] = useState("")
    const [password,setPassword] = useState("")

    const PostData() = ()=>{
        fetch("http;//localhost:3000/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            }
            body:JSON.stringify({
                name:name
            })
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
                value = {date}
                onChange = {(e)=>setDate(e.target.value)}
                required />
                <input type="password" placeholder="Password" name="password" autocomplete="new-password" 
                value = {password}
                onChange = {(e)=>setPassword(e.target.value)}
                required />
                <input type="submit" value="Register" name="register" class="btn btn-block btn-primary" />
            </div>

        </div>
    )

}
export default Signup
import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signup = ()=>{
    const history=useHistory()
    const [username,setUsername] = useState("")
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [dob,setDate] = useState("")
    const [password,setPassword] = useState("")
    const[image,setImage]=useState("")
    const[url,setUrl]=useState(undefined)
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])

    const uploadPic=()=>{
        const data=new FormData()
        data.append("file",image)
        data.append("upload_preset","social-networking")
        data.append("cloud_name","fierce-citadel")
        fetch("https://api.cloudinary.com/v1_1/fierce-citadel/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })

    }

    const uploadFields=()=>{
        if(!username||!name||!email||!dob||!password)
        {
            M.toast({html:"Please add all the fields"})
            return 
        }
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Invalid Email"})
            return 
        }
        fetch("http://localhost:3001/register",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username,
                name,
                email,
                dob,
                password,
                photo:url
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
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

    const PostData= ()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
        
    }

    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2>Register</h2>
                <br></br><br></br>
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

                <div className="file-field input-field">
                <div className="btn">
                <span>Choose Profile Picture</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
                </div>
                </div>

                <center><button className="btn btn-block btn-primary" onClick={()=>PostData()}>Register</button></center>
            </div>

        </div>
    )

}
export default Signup
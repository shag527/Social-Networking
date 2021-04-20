import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Reset = ()=>{
    const history=useHistory()
    const [username,setUsername] = useState("")
    const PostData= ()=>{
        fetch("http://localhost:3001/reset-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                username,
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
                
                <center><button className="btn btn-block btn-primary" onClick={()=>PostData()}>Reset Password</button></center>
            </div>
            

        </div>
    )
}
export default Reset
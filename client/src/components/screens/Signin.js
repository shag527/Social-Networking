import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'
import props from 'prop-types';

const Signin = ()=>{
    const {state,dispatch}=useContext(UserContext)
    const history=useHistory()
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const PostData= ()=>{
        fetch("http://localhost:3001/login",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                localStorage.setItem("id",JSON.stringify(data.user._id))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"Signed In Successfully"})
                history.push("/")
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2>Login</h2>
                <br></br><br></br><br></br>
                <input type="text" placeholder="User Name" name="username"
                value = {username}
                onChange = {(e)=>setUsername(e.target.value)}
                required />
                
                <input type="password" placeholder="Password" name="password" autocomplete="new-password" 
                value = {password}
                onChange = {(e)=>setPassword(e.target.value)}
                required />
                <center><button className="btn btn-block btn-primary" onClick={()=>PostData()}>Login</button></center>
                <br></br><br></br>
                Don't have account yet? <Link to="/signup"> Register Here</Link>
                <br></br><br></br>
                Forgot Password? <a href="/reset"> Click Here</a>
            </div>
            

        </div>
    )
}
export default Signin
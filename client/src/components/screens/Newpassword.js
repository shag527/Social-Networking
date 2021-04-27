import React,{useState,useContext} from 'react'
import {Link,useHistory,useParams} from 'react-router-dom'
import M from 'materialize-css'

const Signin = ()=>{
    const history=useHistory()
    const [password,setPassword] = useState("")
    const {token} = useParams()
    const PostData= ()=>{
        fetch("http://localhost:3001/new-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                token
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
                
                <input type="password" placeholder="New Password" name="password" autocomplete="new-password" 
                value = {password}
                onChange = {(e)=>setPassword(e.target.value)}
                required />
                <center><button className="btn btn-block btn-primary" onClick={()=>PostData()}>Reset</button></center>
            </div>
            

        </div>
    )
}
export default Signin
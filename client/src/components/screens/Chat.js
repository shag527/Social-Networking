import React,{useState,useEffect} from 'react'
import axios from "axios"
import{Link,user,withRouter} from 'react-router-dom'
import M from 'materialize-css'


const Chat=(props)=>{
    const[chatrooms,setChatrooms]=useState([])
    const[chatroomName,setChatroomName]=useState("")

    const getChatrooms=()=>{
        axios.get("http://localhost:3001/chat",{
            method:"get",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
        }).then(response=>{
            setChatrooms(response.data)
        }).catch((err)=>{
            setTimeout(getChatrooms,3000);
        })
    }

    const CreateChatroom= ()=>{
        fetch("http://localhost:3001/chat",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                chatroomName
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error})
            }
            else{
                M.toast({html:data.message})
                window.location.reload()
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getChatrooms()
    },[])

    return (
		<div className="mycard" style={{margin:"100px"}}>
            <div className="card auth-card">
                <h2>Create Chatroom</h2>
                
                <input type="text" placeholder="Enter Chatroom Name" name="Chatroom" onChange={(e)=>setChatroomName(e.target.value)} required />
                
                <center><button onClick={CreateChatroom} style={{margin:"30px"}} className="btn btn-block btn-primary">Create</button></center>
            
            </div>
			<br></br>
            {chatrooms.map(chatroom=>(
                <div key={chatroom._id} className="card sub-auth-card">
                <h5 style={{fontFamily:"serif"}}>{chatroom.name}</h5>                
                <center>
                    <Link to={"/chat/"+chatroom._id}>
                    <button className="btn btn-block btn-primary">Join</button>
                    </Link>
                    </center>
                </div>
            ))}
            

        </div>
	)
}

export default Chat
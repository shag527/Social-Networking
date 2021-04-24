import React,{useState,useEffect,useRef} from 'react'
import {withRouter} from 'react-router-dom'
import io from 'socket.io-client'
import M from 'materialize-css'
import socket from './socket'

const ChatRoom=({match})=>{
    var chatroomId=localStorage.getItem("id");
    chatroomId=chatroomId.slice(1,-1)

    const [messages,setMessages]=useState([])
    const messageRef=useRef()

    const sendMessage=()=>{
        if(socket){
            socket.emit("chatroomMessage",{
                chatroomId,
                message:messageRef.current.value
            })
            messageRef.current.value=""
        }
    }
    
    useEffect(()=>{
        if(socket)
        {
            socket.on("newMessage",(message)=>{
                const newMessages=[...messages,message]
                setMessages(newMessages)
            })
        }
    },[messages])

    useEffect(()=>{
        if(socket)
        {
            socket.emit("joinRoom",{
                chatroomId
            })
        }
        return ()=>{
            if(socket){
                socket.emit("leaveRoom",{
                    chatroomId
                })
            }
        }

    },[])
    

    return (
		<div className="mycard" style={{ margin:"100px"}}>
            <div className="card auth-card" >
                <h2>Chatroom Name</h2>
                {messages.map((message,i)=>(
                    <center><div key={i} className="mycard auth-card" >{message.name}: {message.message} </div></center>
                ))}
                </div>
                <div className="card auth-card">
                <input type="text" name="message" placeholder="Say Something" ref={messageRef}/>
                <center><button onClick={sendMessage} style={{margin:"30px"}} className="btn btn-block btn-primary">Send</button></center>
                </div>
            
            
			<br></br>
			
            

        </div>
	)
}

export default withRouter(ChatRoom)
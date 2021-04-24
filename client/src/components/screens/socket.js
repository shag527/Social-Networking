import M from 'materialize-css'
import io from 'socket.io-client'
import React,{useState,useEffect,createContext,useReducer,useContext} from 'react';


var socket=null
const id=localStorage.getItem("id")
console.log(id)

if(!socket){
  const newSocket=io.connect("http://localhost:3001/",{
    query:{
        token:localStorage.getItem("id")
    }
})

newSocket.on("disconnect",()=>{
  M.toast({html:"Disconnected"})
})

newSocket.on("connect",()=>{
  M.toast({html:"Connected"})
})

socket=newSocket
}



export default socket;
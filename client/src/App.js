import React,{useState,useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter, Route, Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import Signin from './components/screens/Signin'
import CreatePost from './components/screens/CreatePost'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from'./components/screens/UserProfile'
import SubscribedUserPosts from './components/screens/SubscibedUserPosts'
import Reset from './components/screens/Reset'
import NewPassword from './components/screens/Newpassword'
import Chat from './components/screens/Chat'
import ChatRoom from './components/screens/ChatRoom'
import M from 'materialize-css'
import io from 'socket.io-client'

export const UserContext=createContext()

const Routing = ()=>{
  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)
  var socket=null

  /*const setupSocket=()=>{
    const token=localStorage.getItem("jwt")
    
    if(true){
      const newSocket=io.connect("http://localhost:3001/",{
        query:{
            token:localStorage.getItem("jwt")
        }
    })
    
    newSocket.on("disconnect",()=>{
      setTimeout(setupSocket,3000)
      M.toast({html:"Disconnected"})
    })
   
    newSocket.on("connect",()=>{
      M.toast({html:"Connected"})
    })
   
    socket=newSocket
  }}
  useEffect(()=>{
    setupSocket()
  },[])*/

  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      if(!history.location.pathname.startsWith('/reset'))
      history.push('/signin')
    }
  },[])
  
  return (
    <switch>
    <Route exact path="/">
    <Home />
    </Route>
      <Route exact path="/signin">
        <Signin />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/create">
        <CreatePost />
      </Route>
      <Route exact path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route exact path="/subposts">
        <SubscribedUserPosts />
      </Route>
      <Route exact path="/reset">
        <Reset />
      </Route>
      <Route exact path="/reset/:token">
        <NewPassword />
      </Route>
      <Route exact path="/chat">
        <Chat />
      </Route>
      <Route exact path="/chat/:id">
        <ChatRoom/>
      </Route>

      </switch>
  )
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar />
      <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
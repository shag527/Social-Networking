import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'

const NavBar = ()=>{
  const searchModal=useRef(null)
  const {state,dispatch}=useContext(UserContext)
  const history=useHistory()
  const[userDetails,setUserDetails]=useState([])
  const [search,setSearch]=useState("")
  useEffect(()=>{
    M.Modal.init(searchModal.current)
  },[])
  const renderList =()=>{
    if(state){
      return [
        <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
        <li key="2"><Link to="/profile">Profile</Link></li>,
        <li key="3"><Link to="/create">Create Post</Link></li>,
        <li key="4"><Link to="/chat">Chat</Link></li>,
        <li key="5"><Link to="/">Explore</Link></li>,
        <li key="6"><button className="btn btn-block btn-primary" style={{margin:"13px"}}
            onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin')
            }}>Logout</button></li>
      ]
    }else{
      return [
        <li key="6"><Link to="/signin">Signin</Link></li>,
        <li key="7"><Link to="/signup">Signup</Link></li>
      ]
    }
  }

  const fetchUsers = (query)=>{
    setSearch(query)
    fetch('http://localhost:3001/search-users',{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        query
      })
    }).then(res=>res.json())
    .then(results=>{
      setUserDetails(results.user)
    })
 }

 function refreshPage() {
  setTimeout(()=>{
      window.location.reload(false);
  }, 500);
  console.log('page to reload')
}

    return(
        <nav>
        <div className="nav-wrapper white">
          <Link to={state?"/subposts":"/signin"} className="brand-logo left">    Coffee</Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>

        <div id="modal1" class="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
             <ul className="collection">
               {userDetails.map(item=>{
                 console.log(item._id)
                 return <Link to={item._id!==state._id?"/profile/"+item._id+'/':'/profile' }  onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close();refreshPage()
                   setSearch('') 
                 }}>
                 <li className="collection-item" >{item.username}</li></Link> 
               })}
               
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')} >close</button>
          </div>
        </div>

      </nav>
    )
}

export default NavBar
import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'

const Profile = ()=>{
    const [mypics,setPics]=useState([])
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        fetch("http://localhost:3001/mypost",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
        })
    },[])
    return (
       <div style={{maxWidth:"950px",margin:"0px auto"}}>
           <div style={{
               display:"flex",
               justifyContent:"space-around",
               margin: "18px 0px",
               borderBottom:"1px solid grey"
           }}>
               <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1132&q=80"
                   />
               </div>
               <div>
                   <h4>{state?state.name:"Loading"}</h4>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>No of posts</h6>
                       <h6>No of followers</h6>
                       <h6>No of following</h6>
                   </div>
               </div>
           </div>
           <did className="gallery">
               {
                   mypics.map(item=>{
                       return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>
                       )
                   })
               }
           </did>
      
       </div>
    )

}
export default Profile
import React from 'react'

const Profile = ()=>{
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
                   <h4>Name</h4>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>No of posts</h6>
                       <h6>No of followers</h6>
                       <h6>No of following</h6>
                   </div>
               </div>
           </div>
           <did className="gallery">
               <img className="item" src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1132&q=80"/>
               <img className="item" src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1132&q=80"/>
               <img className="item" src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1132&q=80"/>
               <img className="item" src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1132&q=80"/>
               <img className="item" src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1132&q=80"/>
               <img className="item" src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1132&q=80"/>
               <img className="item" src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1132&q=80"/>
               <img className="item" src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1132&q=80"/>
               <img className="item" src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1132&q=80"/>
           </did>
      
       </div>
    )

}
export default Profile
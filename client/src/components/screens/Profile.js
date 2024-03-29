import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'


const Profile = ()=>{
    
    const [mypics,setPics]=useState([])
    const {state,dispatch}=useContext(UserContext)
    const[image,setImage]=useState("")
    const[url,setUrl]=useState("")
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

    useEffect(()=>{
        if(image){
        const data=new FormData()
        data.append("file",image)
        data.append("upload_preset","social-networking")
        data.append("cloud_name","fierce-citadel")
        fetch("https://api.cloudinary.com/v1_1/fierce-citadel/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            //localStorage.setItem("user",JSON.stringify({...state,photo:data.url}))
            //dispatch({type:"UPDATEPHOTO",payload:data.url})
            fetch("http://localhost:3001/updatepic",{
                method  :"put",  
                headers:{
                    "Content-Type":"application/json",
                     "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        photo:data.url
                    })
                }).then(res=>res.json())
                .then(result=>{
                    console.log(result)
                    localStorage.setItem("user",JSON.stringify({...state,photo:result.photo}))
                    dispatch({type:"UPDATEPHOTO",payload:result.photo})
                    window.location.reload()
                })
        })
        .catch(err=>{
            console.log(err)
        })
        }
    },[image])
    const updatePhoto=(file)=>{
        setImage(file)
        

    }

    return (
       <div style={{maxWidth:"1050px",margin:"0px auto"}}>
           <div style={{
               display:"flex",
               justifyContent:"space-around",
               margin: "18px 0px",
               borderBottom:"1px solid grey"
           }}>
               <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={state?state.photo:"Loading..."}
                   />

                <div className="file-field input-field" style={{margin:"5px"}}>
                <div className="btn">
                <span>Update Profile</span>
                <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
                </div>
                </div>

               </div>
               <div>
                   <h4>{state?state.name:"Loading"}</h4>
                   <center><h6>{state?state.email:"Loading"}</h6></center>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%",margin:"0px 0px 100px 0px"}}>
                       <h6>{mypics.length} posts</h6>
                       <h6>{state?state.followers.length:"Loading..."} followers</h6>
                       <h6>{state?state.following.length:"Loading..."} following</h6>
                   </div>
               </div>
           </div>
           <did className="gallery grey lighten-3">
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
import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import{Link} from 'react-router-dom'

const Home = ()=>{
    const [data,setData]=useState([])
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        fetch("http://localhost:3001/getsubpost",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
        })
    },[])

    const likePost=(id)=>{
        fetch("http://localhost:3001/like",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(result=>{
            const newData=data.map(item=>{
                if(item._id==result._id){
                    window.location.reload()
                    return result
                }else{
                    window.location.reload()
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }

    const unlikePost=(id)=>{
        fetch("http://localhost:3001/unlike",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(result=>{
            const newData=data.map(item=>{
                if(item._id==result._id){
                    window.location.reload()
                    return result
                }else{
                    window.location.reload()
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }

    const makecomment=(text,postId)=>{
        fetch("http://localhost:3001/comment",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData=data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
        })
        setData(newData)
       }).catch(err=>{
           console.log(err)
       })
    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }

    return (
        <div className="" style={{maxWidth:"100%"}}>
            <div class = "leftbox " style={{float:"left", width:"13%", maxHeight:"max-content"}}>
              <br></br><br></br>
              <center>
                <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={state?state.photo:"Loading..."}/>
               <h3>{state?state.name:"Loading"}</h3> 
               <br></br>
               <h6>
               <Link to="/profile">Profile</Link>
               <br></br><br></br>
                <Link to="/create">Post</Link>
                <br></br><br></br>
               <Link to="/chat">Chat</Link>
               <br></br><br></br>
               <Link to="/">Explore</Link>
               <br></br><br></br>
               <Link to="/reset">Reset-Password</Link>
               <br></br><br></br>
               </h6>
               </center>
            </div>
            <div className="grey lighten-3" style={{backgroundColor:"#eeeeee"}}></div>
               
            <div className = "grey lighten-3" style={{float:"right", width:"37%", maxHeight:"max-content"}} >
              <iframe width="560" height="315" src="https://health.economictimes.indiatimes.com/widget/hospitals" frameborder="0"></iframe>
               <iframe width="560" height="315" src="https://health.economictimes.indiatimes.com/widget/health-it" frameborder="0"></iframe>
               <iframe width="560" height="315" src="https://health.economictimes.indiatimes.com/widget/education" frameborder="0"></iframe>
               <iframe width="560" height="315" src="https://health.economictimes.indiatimes.com/widget/medical-devices" frameborder="0"></iframe>
               <iframe width="560" height="315" src="https://health.economictimes.indiatimes.com/widget/diagnostics" frameborder="0"></iframe>
               <iframe width="560" height="315" src="https://health.economictimes.indiatimes.com/widget/ge-bulletin" frameborder="0"></iframe>
               <iframe width="560" height="315" src="https://health.economictimes.indiatimes.com/widget/finance" frameborder="0"></iframe>
               <iframe width="560" height="315" src="https://health.economictimes.indiatimes.com/widget/insurance" frameborder="0"></iframe>
               <iframe width="560" height="315" src="https://health.economictimes.indiatimes.com/widget/people-movement" frameborder="0"></iframe>
               <iframe width="560" height="315" src="https://health.economictimes.indiatimes.com/widget/industry" frameborder="0"></iframe>
            </div>
        <div className="home grey lighten-3" style={{float:"left",width:"47%"}} >
            {
                data.map(item=>{
                    return(
                        <div className="card home-card" key={item._id}>
                       <h5 style={{padding:"5px"}}><Link to={item.postedBy._id!==state._id?"/profile/"+item.postedBy._id:"/profile"}>{item.postedBy.name}</Link> {item.postedBy._id==state._id &&
                       <i className="material-icons" style={{float:"right"}} onClick={()=>{deletePost(item._id)}}>delete</i>}</h5>
                    <div className="card-image">
                    <img src={item.photo}/>
                    </div>
                    <div className="card-content">
                    <i className="material-icons"  style={{color:"red"}}>favorite</i>
                    {item.likes.includes(state._id)
                            ? 
                             <i className="material-icons" onClick={()=>{unlikePost(item._id)}}>thumb_down</i>
                            : 
                            <i className="material-icons" onClick={()=>{likePost(item._id)}}>thumb_up</i>
                            }

                
                    <h6>{item.likes.length} Likes</h6>
                    <h6>{item.title}</h6>
                    <p>{item.body}</p>
                    {
                        item.comments.map(record=>{
                            return(
                                <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span>:&nbsp;{record.text}</h6>
                            )
                        })
                    }
                    <form on onSubmit={(e)=>{
                        e.preventDefault()
                        makecomment(e.target[0].value,item._id)
                    }}>
                    <input type="text" placeholder="add comment"/>
                    </form>
                    
                </div>
            </div>
                    )
                })
            }
           </div>
        </div>
    )

}
export default Home
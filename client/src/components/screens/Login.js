import React from 'react'

const Login = ()=>{
    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2>Coffee</h2>
                <input type="text" title="username" placeholder="username" name="username" required />
                <input type="password" title="password" placeholder="password" name="password" required/>
                <button className="btn waves-effect waves-light">Login</button>
                <br></br><br></br>
                <a href="/signup">Register</a>
            </div>

        </div>
    )

}
export default Login
import React from 'react'

const Signup = ()=>{
    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2>Coffee</h2>
                
                <input type="text" placeholder="User Name" name="username" required />
                <input type="text" placeholder="Name" name="name" required />
                <input type="email" placeholder="Email" name="email" required />
                <input type="date" placeholder="Date of Birth" name="dob" required />
                <input type="password" placeholder="Password" name="password" autocomplete="new-password" required />
                <input type="submit" value="Register" name="register" class="btn btn-block btn-primary" />
            </div>

        </div>
    )

}
export default Signup
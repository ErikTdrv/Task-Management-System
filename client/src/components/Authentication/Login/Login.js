import React from 'react';
import './Login.css';

export default function Login(){
    return (
        <div className="login_container">
            <form className="login_form">
                <h1>Login</h1>
                <div className="email">
                    {/* <label>Email:</label> */}
                    <i className="fa-solid fa-envelope"></i>
                    <input type="text" placeholder='Email...' />
                </div>
                <div className="password">
                    {/* <label>Password:</label> */}
                    <i className="fa-solid fa-lock"></i>
                    <input type="password" placeholder='Password...' />
                </div>
                <button>Login</button>
            <p>Don't have an account? <span>Sign Up Here</span></p>
            </form>
        </div>
    )
}

import React, { useEffect, useState } from 'react';
import './Register.css';
import { convertToBase64, register } from '../../../services/userService';

export default function Register() {
    const [authData, setAuthData] = useState({username: '', email:'', password: '', repeatPassword: '', profilePicture: ''})
    const [errors, setErrors] = useState({username: '', email:'', password: '', repeatPassword: '', profilePicture: ''})
    
    async function registerHandler(e){
        e.preventDefault()
        console.log(authData)
        const user = await register(authData);
    }
    return (
        <div className="register_container">
            <form onSubmit={registerHandler} className="register_form">
                <h1>Register Here</h1>
                {authData.profilePicture && <img src={authData.profilePicture} alt="profile-picture" />}
                <div className="username">
                    <i className="fa-solid fa-user"></i>
                    <input type="text" placeholder='Username...'
                    onChange={(e) => setAuthData({...authData, username: e.target.value})}
                    />
                </div>
                <div className="email">
                    <i className="fa-solid fa-envelope"></i>
                    <input type="text" placeholder='Email...'
                    onChange={(e) => setAuthData({...authData, email: e.target.value})}
                    />
                </div>
                <div className="password">
                    <i className="fa-solid fa-lock"></i>
                    <input type="password" placeholder='Password...'
                    onChange={(e) => setAuthData({...authData, password: e.target.value})}
                    />
                </div>
                <div className="re-pass">
                    <i className="fa-solid fa-lock"></i>
                    <input type="password" placeholder='Repeat Password...'
                    onChange={(e) => setAuthData({...authData, repeatPassword: e.target.value})}
                    />
                </div>
                <div className="file">
                    <label>
                        <i className="fa-solid fa-plus"></i>
                        Add Profile Picture
                        <input type="file"
                        onChange={async (e) => setAuthData({...authData, profilePicture: await convertToBase64(e.target.files[0])})}
                        />
                    </label>
                </div>
                <button>Register</button>
            <p>Already have an account? <span>Sign In Here</span></p>
            </form>
        </div>
    )
}
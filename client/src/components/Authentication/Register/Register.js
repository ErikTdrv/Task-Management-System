import React from 'react';
import './Register.css';

export default function Register() {
    return (
        <div className="register_container">
            <form className="register_form">
                <h1>Register Here</h1>
                <img src="./logo192.png" alt="profile-picture" />
                <div className="username">
                    {/* <label>Username:</label> */}
                    <i class="fa-solid fa-user"></i>
                    <input type="text" placeholder='Name...' />
                </div>
                <div className="email">
                    {/* <label>Email:</label> */}
                    <i class="fa-solid fa-envelope"></i>
                    <input type="text" placeholder='Email...' />
                </div>
                <div className="password">
                    {/* <label>Password:</label> */}
                    <i class="fa-solid fa-lock"></i>
                    <input type="password" placeholder='Password...' />
                </div>
                <div className="re-pass">
                    {/* <label>Repeat Password:</label> */}
                    <i class="fa-solid fa-lock"></i>
                    <input type="password" placeholder='Repeat Password...' />
                </div>
                <div className="file">
                    <label>
                        <i class="fa-solid fa-plus"></i>
                        Add Profile Picture
                        <input type="file" />
                    </label>
                </div>
                <button>Register</button>
            <p>Already have an account? <span>Sign In Here</span></p>
            </form>
        </div>
    )
}
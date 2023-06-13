import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Authentication.css';
import { login } from '../../services/userService';

export default function Login(){
    const [authData, setAuthData] = useState({email: '', password: ''})
    const [mainError, setMainError] = useState('');
    const navigate = useNavigate();

    async function loginHandler(e){
        e.preventDefault();
        const user = await login(authData);
        if(user?.error){
            setMainError(user.error)
        }else {
            setMainError('');
            navigate('/home')
        }
    }
    return (
        <div className="authentication_container">
            <form onSubmit={loginHandler} className="authentication_form">
                <h1 data-testid="login-title">Login</h1>
                { mainError && <span className='error'>{mainError}</span>}
                <div className="email divs">
                    <i className="fa-solid fa-envelope"></i>
                    <input data-testid="email-input" type="text" placeholder='Email...' 
                    onChange={(e) => setAuthData({...authData, email: e.target.value})}
                    />
                </div>
                <div className="password divs">
                    <i className="fa-solid fa-lock"></i>
                    <input data-testid="password-input" type="password" placeholder='Password...' 
                    onChange={(e) => setAuthData({...authData, password: e.target.value})}
                    />
                </div>
                <button name='Login'>Login</button>
            <p>Don't have an account? <span>Sign Up Here</span></p>
            </form>
        </div>
    )
}

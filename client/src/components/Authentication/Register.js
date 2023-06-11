import React, { useEffect, useState } from 'react';
import './Authentication.css';
import { convertToBase64, register } from '../../services/userService';
import ReCAPTCHA from 'react-google-recaptcha';
import {  useNavigate } from 'react-router-dom';

export default function Register() {
    const [authData, setAuthData] = useState({ username: '', email: '', password: '', repeatPassword: '', profilePicture: '', captcha: '' })
    const [errors, setErrors] = useState({ username: '', email: '', password: '', repeatPassword: '', profilePicture: '', captcha: '' })
    const [mainError, setMainError] = useState('');
    const [areErrors, setAreErrors] = useState(false)
    const navigate = useNavigate();
    async function registerHandler(e) {
        e.preventDefault()
        if (authData.captcha == '') {
            setAreErrors(true)
            return setErrors({ ...errors, captcha: 'You must complete captcha!' })
        } else if (authData.profilePicture == '') {
            setAreErrors(true)
            return setErrors({ ...errors, profilePicture: 'You must upload profile picture!' })
        }
        const user = await register(authData);
        if (user?.error) {
            setMainError(user.error)
        }else {
            navigate('/home')
        }
    }
    function validateInputs(e, type) {
        const currentValue = e.target.value;
        if (currentValue == '') {
            setErrors({ ...errors, [type]: 'Field is required!' })
        } else if (type == 'repeatPassword' && authData.repeatPassword != authData.password) {
            setErrors({ ...errors, [type]: 'Passwords must be equal!' })
        } else if (type == 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (currentValue.length < 8 || currentValue.length > 30) {
                setErrors({ ...errors, [type]: 'Email must have 8 - 30 characters!' })
            } else if (!emailRegex.test(currentValue)) {
                setErrors({ ...errors, [type]: 'Email must be valid!' })
            } else {
                setErrors({ ...errors, [type]: '' })
            }
        } else if (type == 'username' && (currentValue.length < 2 || currentValue.length > 10)) {
            setErrors({ ...errors, [type]: 'Username must have 2 - 10 characters!' })
        } else if (type == 'password' && (currentValue.length < 6 || currentValue.length > 15)) {
            setErrors({ ...errors, [type]: 'Password must have 6 - 15 characters!' })
        } else {
            setErrors({ ...errors, [type]: '' })
        }
    }
    return (
        <div className="authentication_container">
            <form onSubmit={registerHandler} className="authentication_form">
                <h1>Register Here</h1>
                {mainError && <span className='error'>{mainError}</span>}
                {authData.profilePicture && <img src={authData.profilePicture} alt="profile-picture" />}
                <div className="divs username">
                    <i className="fa-solid fa-user"></i>
                    <input type="text" placeholder='Username...'
                        onChange={(e) => setAuthData({ ...authData, username: e.target.value })}
                        onBlur={(e) => validateInputs(e, 'username')}
                    />
                </div>
                {errors?.username && <span className='error'>{errors.username}</span>}
                <div className="divs email">
                    <i className="fa-solid fa-envelope"></i>
                    <input type="text" placeholder='Email...'
                        onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
                        onBlur={(e) => validateInputs(e, 'email')}
                    />
                </div>
                {errors?.email && <span className='error'>{errors.email}</span>}
                <div className="divs password">
                    <i className="fa-solid fa-lock"></i>
                    <input type="password" placeholder='Password...'
                        onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
                        onBlur={(e) => validateInputs(e, 'password')}
                    />
                </div>
                {errors?.password && <span className='error'>{errors.password}</span>}
                <div className="divs re-pass">
                    <i className="fa-solid fa-lock"></i>
                    <input type="password" placeholder='Repeat Password...'
                        onChange={(e) => setAuthData({ ...authData, repeatPassword: e.target.value })}
                        onBlur={(e) => validateInputs(e, 'repeatPassword')}
                    />
                </div>
                {errors?.repeatPassword && <span className='error'>{errors.repeatPassword}</span>}
                <div className="divs file">
                    <label>
                        <i className="fa-solid fa-plus"></i>
                        Add Profile Picture
                        <input type="file"
                            onChange={async (e) => setAuthData({ ...authData, profilePicture: await convertToBase64(e.target.files[0]) })}
                            onBlur={(e) => validateInputs(e, 'profilePicture')}
                        />
                    </label>
                </div>
                {errors?.profilePicture && <span className='error'>{errors.profilePicture}</span>}
                <ReCAPTCHA className='captcha' onChange={(token) => setAuthData({ ...authData, captcha: token })}
                    sitekey="6LddUYgmAAAAAHPKEc3-tIjOITc6PCzrs4Zl_9Sz" />
                {errors?.captcha && <span className='error'>{errors.captcha}</span>}
                <button disabled={Object.values(errors).some((e) => e.length > 0) ||
                    Object.values(authData).some((e) => e.length === 0)}>Register</button>
                <p>Already have an account? <span>Sign In Here</span></p>
            </form>
        </div>
    )
}
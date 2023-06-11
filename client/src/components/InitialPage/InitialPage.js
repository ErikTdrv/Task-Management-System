import React from "react";
import './InitialPage.css'
import { Link } from 'react-router-dom';

export default function InitialPage() {
  return (
    <div className="home-container">
      <div className="initial_page">
        <h1>Welcome to the Task Management System!</h1>
        <div className="options-container">
          <Link to="/login" className="login-option">
            Login
          </Link>
          <Link to="/register" className="register-option">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}
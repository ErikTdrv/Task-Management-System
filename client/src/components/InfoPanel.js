import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { logout } from "../services/userService";

export default function InfoPanel({ handleDownload }) {
    const navigate = useNavigate()
    async function logoutHandler(){
        const user = await logout();
        if(!user.error){
            navigate('/')
        }
    }
    return (
        <div className="info__panel">
            <div className="options">
                <Link to={'/home'}>
                    <div>
                        <i className="fa-solid fa-list-check"></i>
                        <h1>Tasks</h1>
                    </div>
                </Link>
                <Link to={'/completed-tasks'}>
                    <div>
                        <i className="fa-solid fa-check"></i>
                        <h1>Completed Tasks</h1>
                    </div>
                </Link>
                <div onClick={() => handleDownload('tasks')}>
                    <i className="fa-solid fa-file-export"></i>
                    <h1>Download Tasks</h1>
                </div>
                <div onClick={() => handleDownload('completed')}>
                    <i className="fa-solid fa-file-export"></i>
                    <h1>Download Completed Tasks</h1>
                </div>
                <div onClick={logoutHandler}>
                    <i class="fa-solid fa-right-from-bracket"></i>
                    <h1>Logout</h1>
                </div>

            </div>
            <div className="add_task" onClick={() => navigate('/add-task')}>
                <i className="fa-solid fa-plus"></i>
            </div>
        </div>
    )
}
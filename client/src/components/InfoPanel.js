import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { logout } from "../services/userService";
import { useSelector } from "react-redux";

export default function InfoPanel({ handleDownload }) {
    const user = useSelector(state => state.user.user);
    const [userData, setUserData] = useState();
    const navigate = useNavigate()
    useEffect(() => {
        setUserData(user)
    }, [user])
    async function logoutHandler() {
        const user = await logout();
        if (!user.error) {
            navigate('/')
        }
    }
    return (
        <div className="info__panel">
            <div className="options">
                <Link to={'/profile'}>
                    <div>
                        <img src={user?.profilePicture} alt="user-picture" />
                        <h1>{user?.username}</h1>
                    </div>
                </Link>
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
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <h1>Logout</h1>
                </div>

            </div>
            <div className="add_task" onClick={() => navigate('/add-task')}>
                <i className="fa-solid fa-plus"></i>
            </div>
        </div>
    )
}
import React, { useEffect, useState } from "react";
import './Profile.css'
import InfoPanel from "../InfoPanel";
import { useSelector } from "react-redux";

export default function Profile() {
    const user = useSelector(state => state.user.user);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        setUserData(user)
    }, [user])
    return (
        <div className="home__container my_container">
            <InfoPanel />
            {userData?._id && (
                <div className="profile__container">
                    <div className="profile">
                        <img src={userData?.profilePicture} alt="profile-picture" />
                        <div className="info">
                            <span>Username: <span>{userData?.username}</span></span>
                            <span>Email: <span>{userData?.email}</span></span>
                            <span>Current Tasks: <span>{userData?.addedTasks.length}</span></span>
                            <span>Completed Tasks: <span>{userData?.completedTasks.length}</span></span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
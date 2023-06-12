import React from "react";
import { Link, useNavigate } from 'react-router-dom';

export default function InfoPanel({handleDownload}) {
    const navigate = useNavigate()
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
            </div>
            <div className="add_task" onClick={() => navigate('/add-task')}>
                <i className="fa-solid fa-plus"></i>
            </div>
        </div>
    )
}
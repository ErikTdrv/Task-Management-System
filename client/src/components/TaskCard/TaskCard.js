import React from "react";
import './TaskCard.css'

export default function TaskCard({task}) {
    return (
        <div className="task">
            <div className="task-info">
                <div className="name">{task.title}</div>
                <div className="due">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>{task.date}</span>
                </div>
                <div className="importance">{task.importance}</div>
            </div>
            <input type="checkbox" name="" id="" />
        </div>
    )
}
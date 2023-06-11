import React, { useEffect, useState } from "react";
import { calculateTime } from "../../services/taskService";
import { Link } from 'react-router-dom';

export default function TaskOverview({ task }) {
    const [timeLeft, setTimeLeft] = useState('');
    const [hasTimePassed, setHasPassedTime] = useState(false);

    useEffect(() => {
        calculateTime(task, setTimeLeft, setHasPassedTime)
        
    }, [task]);
    return (
        <div className='task__overview__task'>
            <h1>{task.title}</h1>
            <div className="due">
                <i className="fa-solid fa-calendar-days"></i>
                <span> {task.date}</span>
            </div>
            <div className="hours">
                <i className="fa-solid fa-clock"></i>
                <span>{task.hours}:{task.minutes}</span>
            </div>
            <div className="hours_left">
                <i className="fa-regular fa-hourglass-half"></i>
                {!hasTimePassed ? <span>Time left: {timeLeft}</span> : <span className="passed_time">TIME HAS PASSED!!!</span>}
            </div>
            <div className="description">
                {task.description}
            </div>
            <div className="buttons">
                <button className='deleteBtn'>Delete</button>
                <button className='shareBtn'>Share</button>
                <Link to={`/add-task/${task._id}`}>
                    <button className='editBtn'>Edit</button>
                </Link>
                <button className='doneBtn'>Done</button>
            </div>

        </div>
    )
}
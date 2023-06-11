import React, { useEffect, useState } from "react";
import './TaskCard.css'

export default function TaskCard({ task }) {
    const [timeLeft, setTimeLeft] = useState('');
    const [hasTimePassed, setHasPassedTime] = useState(false);
    useEffect(() => {

        const targetDate = new Date(`${task.date}T${task.hours}:${task.minutes}:00`);
        const now = new Date();

        const timeDifference = targetDate - now;

        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
                (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            if(days > 1){
                setTimeLeft(`${days}d ${hours}h`);
            }else if(days == 0 && hours > 1){
                setTimeLeft(`${hours}h ${minutes}m`);
            }else if(days == 0 && hours < 1){
                setTimeLeft(`${minutes}m`);
            }
            setHasPassedTime(false)
        } else {
            setTimeLeft('Time has passed!');
            setHasPassedTime(true)
        }
    }, [task]);
    return (
        <div className={`task ${hasTimePassed && 'passed_time_div'}`}>
            <div className="task-info">
                <div className="name">{task.title}</div>
                <div className="due">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span> {task.date}</span>
                </div>
                <div className="hours">
                    <i class="fa-solid fa-clock"></i>
                    <span>{task.hours}:{task.minutes}</span>
                </div>
                <div className="hours_left">
                    <i className="fa-regular fa-hourglass-half"></i>
                    { !hasTimePassed ? <span>Time left: {timeLeft}</span> : <span className="passed_time">TIME HAS PASSED!!!</span>}
                </div>
            </div>
            {task.importance == 'Not Important' ? (
                <div className={`importance not_important`}>{task.importance}</div>
            ) : (
                <div className={`importance ${task.importance}`}>{task.importance}</div>
            )}
            
            {hasTimePassed ? <i class="fa-solid fa-xmark"></i> : <input type="checkbox" name="" id="" />}
            
        </div>
    )
}
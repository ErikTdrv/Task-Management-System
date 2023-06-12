import React, { useEffect, useState } from "react";
import './TaskCard.css'
import { calculateTime } from "../../services/taskService";

export default function TaskCard({ task, setCurrentTaskClick, setDoneTask }) {
    const [timeLeft, setTimeLeft] = useState('');
    const [hasTimePassed, setHasPassedTime] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    useEffect(() => {
        calculateTime(task, setTimeLeft, setHasPassedTime)
        if(task.isDone){
            setIsChecked(true)
        }
    }, [task]);
    function checkTask(e){
        if(e.target.checked){
            console.log(e.target.checked)
            setDoneTask(task._id);
        }
    }
    return (
        <div onClick={() => setCurrentTaskClick(task)} className={`task ${hasTimePassed ? 'passed_time_div' : ''}`}>
            <div className="task-info">
                <div className="name">{task.title}</div>
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
                    {task.isDone ? <span>TASK IS COMPLETED</span> : (
                        <>
                            {!hasTimePassed ? <span>Time left: {timeLeft}</span> : <span className="passed_time">TIME HAS PASSED!!!</span>}
                        </>
                    )}
                </div>
            </div>
            {task.importance == 'Not Important' ? (
                <div className={`importance not_important`}>{task.importance}</div>
            ) : (
                <div className={`importance ${task.importance}`}>{task.importance}</div>
            )}
        
            <input disabled={task.isDone} type="checkbox" className={isChecked ? 'checked_animation' : ''} checked={isChecked} onChange={(e) => checkTask(e)} name="" id="" />

        </div>
    )
}
import React, { useEffect, useState } from "react";
import './CreateTask.css'
import { addTask, dataTimeValidation, editTask, getOneTask } from "../../services/taskService";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function CreateTask({ mode }) {
    const [taskData, setTaskData] = useState({ title: '', hours: '', minutes: '', date: '', description: '', importance: 'Not Important' })
    const [mainError, setMainError] = useState('');
    const navigate = useNavigate();
    const { taskId } = useParams();
    useEffect(() => {
        async function gettingTask() {
            if (mode == 'edit') {
                const task = await getOneTask(taskId)
                setTaskData(task);
            }
        }
        gettingTask();
    }, [])
    async function addTaskHandler(e) {
        e.preventDefault();
        dataTimeValidation(taskData, setTaskData, setMainError);
        let task;
        // if (taskData.minutes == '0' && taskData.hours == '0') {
        //     setTaskData({ ...taskData, minutes: '00', hours: '00' })
        // }else if(taskData.hours == '0' && taskData.minutes == ''){
        //     setTaskData({ ...taskData, minutes: '00', hours: '00' })
        // }else if(taskData.minutes == '0' && taskData.hours == ''){
        //     setTaskData({ ...taskData, hours: '00', hours: '00' })
        // }
        if (mode == 'edit') {
            task = await editTask(taskData)
        } else {
            task = await addTask(taskData)
        }
        if (task.error) {
            return setMainError(task.error)
        } else {
            navigate('/home')
            return setMainError('')
        }
    }
    return (
        <div className="create_task">
            <div className="authentication_container">
                <form onSubmit={addTaskHandler} className="authentication_form">
                    <h1>Add Task</h1>
                    {mainError && <span className="error">{mainError}</span>}
                    <div className="title divs">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder='Title...'
                            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                            value={taskData.title}
                        />
                    </div>
                    <div className="special">
                        <div className="hours divs">
                            <i className="fa-solid fa-clock"></i>
                            <input type="number" placeholder='Hours'
                                onChange={(e) => setTaskData({ ...taskData, hours: e.target.value })}
                                max={23}
                                min={0}
                                value={taskData.hours}
                            />
                        </div>
                        <div className="hours divs">
                            <i className="fa-solid fa-clock"></i>
                            <input type="number" placeholder='Minutes'
                                onChange={(e) => setTaskData({ ...taskData, minutes: e.target.value })}
                                step={5}
                                max={55}
                                min={0}
                                value={taskData.minutes}
                            />
                        </div>
                    </div>
                    <div className="date divs">
                        <i className="fa-solid fa-calendar-days"></i>
                        <input type="date" placeholder='Date...'
                            onChange={(e) => setTaskData({ ...taskData, date: e.target.value })}
                            value={taskData.date}
                        />
                    </div>
                    <div className="description divs">
                        <i className="fa-solid fa-comment"></i>
                        <textarea placeholder='Description...'
                            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                            maxLength={300}
                            value={taskData.description}
                        />
                    </div>
                    <section>
                        <h1>Importance: </h1>
                        <div>
                            <label className="radio-label">
                                <input type="radio" name="importance"
                                    onChange={(e) => setTaskData({ ...taskData, importance: 'High' })}
                                    checked={taskData.importance === "High"}
                                />
                                <span className="radio-text">High</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="importance"
                                    onChange={(e) => setTaskData({ ...taskData, importance: 'Medium' })}
                                    checked={taskData.importance === "Medium"}
                                />
                                <span className="radio-text">Medium</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="importance"
                                    onChange={(e) => setTaskData({ ...taskData, importance: 'Low' })}
                                    checked={taskData.importance === "Low"}
                                />
                                <span className="radio-text">Low</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="importance"
                                    onChange={(e) => setTaskData({ ...taskData, importance: 'Not Important' })}
                                    checked={taskData.importance === "Not Important"}
                                />
                                <span className="radio-text">Not Important</span>
                            </label>
                        </div>

                    </section>
                    <button className="add_btn">Add Task</button>
                </form>
            </div>

        </div>
    )
}
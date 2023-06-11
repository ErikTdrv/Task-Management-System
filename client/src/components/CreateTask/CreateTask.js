import React, { useState } from "react";
import './CreateTask.css'
import { addTask } from "../../services/taskService";
import { useNavigate } from "react-router-dom";

export default function CreateTask({type}) {
    const [taskData, setTaskData] = useState({ title: '', hours: '', minutes: '', date: '', description: '', importance: 'Not Important' })
    const [mainError, setMainError] = useState('');
    const navigate = useNavigate();
    async function addTaskHandler(e) {
        e.preventDefault();
        const date = new Date(); // Assuming you have a Date object

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        
        if (taskData.minutes == '') {
            setTaskData({ ...taskData, minutes: '00' })
        } else if (taskData.hours == '') {
            setTaskData({ ...taskData, hours: '00' })
        } else {
            setMainError('You must enter Hours or Minutes!')
        }
        if (taskData.date == '' && (taskData.minutes != '' || taskData.hours != '')) {
            setTaskData({ ...taskData, date: formattedDate })
        }else {
            setMainError('You must enter Hours or Minutes!')
        }
        const task = await addTask(taskData)
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
                        />
                    </div>
                    <div className="special">
                        <div className="hours divs">
                            <i className="fa-solid fa-clock"></i>
                            <input type="number" placeholder='Hours'
                                onChange={(e) => setTaskData({ ...taskData, hours: e.target.value })}
                                max={24}
                                min={0}
                            />
                        </div>
                        <div className="hours divs">
                            <i className="fa-solid fa-clock"></i>
                            <input type="number" placeholder='Minutes'
                                onChange={(e) => setTaskData({ ...taskData, minutes: e.target.value })}
                                step={5}
                                max={60}
                                min={0}
                            />
                        </div>
                    </div>
                    <div className="date divs">
                        <i className="fa-solid fa-calendar-days"></i>
                        <input type="date" placeholder='Date...'
                            onChange={(e) => setTaskData({ ...taskData, date: e.target.value })}
                        />
                    </div>
                    <div className="description divs">
                        <i className="fa-solid fa-comment"></i>
                        <textarea placeholder='Description...'
                            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                            maxLength={300}
                        />
                    </div>
                    <section>
                        <h1>Importance: </h1>
                        <div>
                            <label className="radio-label">
                                <input type="radio" name="importance"
                                    onChange={(e) => setTaskData({ ...taskData, importance: 'High' })}
                                />
                                <span className="radio-text">High</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="importance"
                                    onChange={(e) => setTaskData({ ...taskData, importance: 'Medium' })}
                                />
                                <span className="radio-text">Medium</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="importance"
                                    onChange={(e) => setTaskData({ ...taskData, importance: 'Low' })}
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
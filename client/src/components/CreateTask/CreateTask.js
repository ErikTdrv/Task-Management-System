import React, { useState } from "react";
import './CreateTask.css'

export default function CreateTask() {
    const [authData, setAuthData] = useState({title: '', hours: '', minutes: '', date: '', description: '', importance: 'Not Important'})
    return (
        <div className="create_task">
            <div className="authentication_container">
                <form className="authentication_form">
                    <h1>Add Task</h1>
                    <div className="title divs">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder='Title...'
                            onChange={(e) => setAuthData({ ...authData, title: e.target.value })}
                        />
                    </div>
                    <div className="special">
                        <div className="hours divs">
                            <i class="fa-solid fa-clock"></i>
                            <input type="number" placeholder='Hours'
                                onChange={(e) => setAuthData({ ...authData, hours: e.target.value })}
                                max={24}
                                min={0}
                            />
                        </div>
                        <div className="hours divs">
                            <i class="fa-solid fa-clock"></i>
                            <input type="number" placeholder='Minutes'
                                onChange={(e) => setAuthData({ ...authData, minutes: e.target.value })}
                                step={5}
                                max={60}
                                min={0}
                            />
                        </div>
                    </div>
                    <div className="date divs">
                        <i class="fa-solid fa-calendar-days"></i>
                        <input type="date" placeholder='Date...'
                            onChange={(e) => setAuthData({ ...authData, date: e.target.value })}
                        />
                    </div>
                    <div className="description divs">
                        <i class="fa-solid fa-comment"></i>
                        <textarea placeholder='Description...'
                            onChange={(e) => setAuthData({ ...authData, description: e.target.value })}
                        />
                    </div>
                    <section>
                        <h1>Importance: </h1>
                        <div>
                            <label className="radio-label">
                                <input type="radio" name="importance" value="option1"
                                onChange={(e) => setAuthData({...authData, importance:'High'})}
                                />
                                <span className="radio-text">High</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="importance" value="option2"
                                onChange={(e) => setAuthData({...authData, importance:'Medium'})}
                                />
                                <span className="radio-text">Medium</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="importance" value="option3"
                                onChange={(e) => setAuthData({...authData, importance: 'Low'})}
                                />
                                <span className="radio-text">Low</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="importance" value="option4"
                                onChange={(e) => setAuthData({...authData, importance: 'Not Important'})}
                                checked={authData.importance === "Not Important"}
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
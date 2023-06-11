import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="home__container">
            <div className="info__panel">
                <div className="options">
                    <div>
                        <i className="fa-solid fa-list-check"></i>
                        <h1>Tasks</h1>
                    </div>
                    <div>
                        <i className="fa-solid fa-check"></i>
                        <h1>Completed Tasks</h1>
                    </div>
                    <div>
                        <i className="fa-solid fa-file-export"></i>
                        <h1>Download Tasks</h1>
                    </div>
                </div>
                <div className="add_task" onClick={() => navigate('/add-task')}>
                    <i className="fa-solid fa-plus"></i>
                </div>
            </div>
            <div className="main__panel">
                <div className="main__info__panel">
                    <h1>Tasks</h1>
                    <div className="switchable">
                        <button>All</button>
                        <button>Today</button>
                        <button>Important</button>
                    </div>
                </div>
                <div className="tasks">
                    <div className="tasks__panel">
                        <div className="task">
                            <div className="task-info">
                                <div className="name">Learn React</div>
                                <div className="due">
                                    <i className="fa-solid fa-calendar-days"></i>
                                    <span>12/31/2023</span>
                                </div>
                                <div className="importance">High</div>
                            </div>
                            <input type="checkbox" name="" id="" />
                        </div>
                    </div>
                    <div className="task__overview">
                        <h1>Task Overview</h1>
                        <span className='info'>Click on task to see information</span>
                        <img src="./tasks2.jpg" />
                        <div className='task__overview__task'>
                            <h1>Learn React</h1>
                            <div className="due">
                                <i className="fa-solid fa-calendar-days"></i>
                                <span>12/31/2023</span>
                            </div>
                            <div className="description">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos rerum vero, culpa quisquam, nemo architecto eius, exercitationem excepturi voluptates reiciendis voluptatem fuga nihil optio? Inventore, beatae? Dolorum voluptas quaerat dolore?
                            </div>
                            <div className="buttons">
                                <button className='deleteBtn'>Delete</button>
                                <button className='shareBtn'>Share</button>
                                <button className='editBtn'>Edit</button>
                                <button className='doneBtn'>Done</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
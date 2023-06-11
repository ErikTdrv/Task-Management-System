import React, { useEffect, useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';
import { getAllTasks } from '../../services/taskService';
import TaskCard from '../TaskCard/TaskCard';
import TaskOverview from './TaskOverview';

export default function Home() {
    const [allTasks, setAllTasks] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [currentTaskClick, setCurrentTaskClick] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        async function getAllData(){
            const tasks = await getAllTasks();
            if(!tasks?.error){
                console.log(tasks)
                setAllTasks(tasks)
                setIsLoading(false)
            }
        }
        getAllData();
    }, [])  

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
                        { !isLoading && (
                            <>
                            { allTasks.length == 0 ? (
                                <h1 className='empty'>No current tasks!</h1>
                            ) : (
                                allTasks.map((task) => {
                                    return <TaskCard key={task._id} setCurrentTaskClick={setCurrentTaskClick} task={task} />
                                })
                            )}
                            </>
                        )}
                        
                    </div>
                    <div className="task__overview">
                        <h1>Task Overview</h1>
                        <span className='info'>Click on task to see information</span>
                        <img src="./tasks2.jpg" />
                        {currentTaskClick && <TaskOverview task={currentTaskClick}/>}
                    </div>
                </div>
            </div>
        </div>
    );
    
}
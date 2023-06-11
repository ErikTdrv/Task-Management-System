import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import InfoPanel from "../InfoPanel";
import { getCompletedTasks } from "../../services/taskService";
import TaskCard from "../TaskCard/TaskCard";
import TaskOverview from "../Home/TaskOverview";

export default function CompletedTasks(){
    const [allTasks, setAllTasks] = useState({});
    const navigate = useNavigate();
    const [currentTaskClick, setCurrentTaskClick] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function gettingTasks(){
            const tasks = await getCompletedTasks();
            if(!tasks.error){
                setIsLoading(false)
                setAllTasks(tasks)
            }
        }
        gettingTasks()
    }, [])
    return (
        <div className="home__container">
            <InfoPanel/>
            <div className="main__panel">
                <div className="main__info__panel">
                    <h1>Completed Tasks</h1>
                </div>
                <div className="tasks">
                    <div className="tasks__panel">
                        {!isLoading && (
                            <>
                                {allTasks.length == 0 ? (
                                    <h1 className='empty'>No completed tasks!</h1>
                                ) : (
                                    allTasks.map((task) => {
                                        return <TaskCard key={task._id} setCurrentTaskClick={setCurrentTaskClick} task={task} mode={'view'} />
                                    })
                                )}
                            </>
                        )}

                    </div>
                    <div className="task__overview">
                        <h1>Task Overview</h1>
                        <span className='info'>Click on task to see information</span>
                        <img src="./tasks2.jpg" />
                        {currentTaskClick && <TaskOverview task={currentTaskClick} mode={'edit'}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}
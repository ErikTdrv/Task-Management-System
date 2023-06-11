import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import InfoPanel from "../InfoPanel";

export default function CompletedTasks(){
    const navigate = useNavigate();
    return (
        <div className="home__container">
            <InfoPanel/>
            <div className="main__panel">
                <div className="main__info__panel">
                    <h1>Completed Tasks</h1>
                </div>
                <div className="tasks">
                    <div className="tasks__panel">
                        {/* {!isLoading && (
                            <>
                                {allTasks.length == 0 ? (
                                    <h1 className='empty'>No current tasks!</h1>
                                ) : (
                                    allTasks.map((task) => {
                                        return <TaskCard key={task._id} setCurrentTaskClick={setCurrentTaskClick} task={task} />
                                    })
                                )}
                            </>
                        )} */}

                    </div>
                    <div className="task__overview">
                        <h1>Task Overview</h1>
                        <span className='info'>Click on task to see information</span>
                        <img src="./tasks2.jpg" />
                        {/* {currentTaskClick && <TaskOverview task={currentTaskClick} deleteTaskHandler={deleteTaskHandler} setDoneTask={setDoneTask} />} */}
                    </div>
                </div>
            </div>
        </div>
    )
}
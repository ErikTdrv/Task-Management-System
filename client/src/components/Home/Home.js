import React, { useCallback, useEffect, useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';
import { deleteTask, getAllTasks, getCompletedTasks, getTodayDate, setTaskAsDone } from '../../services/taskService';
import TaskCard from '../TaskCard/TaskCard';
import TaskOverview from './TaskOverview';
import { Link } from 'react-router-dom';
import InfoPanel from '../InfoPanel';

export default function Home() {
    const [allTasks, setAllTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [currentTaskClick, setCurrentTaskClick] = useState();
    const [clickedFilter, setClickedFilter] = useState('All Tasks');
    useEffect(() => {
        async function getAllData() {
            const tasks = await getAllTasks();
            const completedTasks = await getCompletedTasks();
            if (!tasks?.error) {
                setAllTasks(tasks)
                setFilteredTasks(tasks)
                setIsLoading(false)
                setCompletedTasks(completedTasks)
            }
        }
        getAllData();
    }, [])
    const sortTasks = async (type) => {
        setClickedFilter(type);
        const formattedDate = getTodayDate();

        if (type === 'Today') {
            //   setAllTasks((prevTasks) =>
            //     prevTasks.filter((task) => task.date === formattedDate)
            //   );
            setFilteredTasks(allTasks.filter((task) => task.date === formattedDate))
        } else if (type === 'All Tasks' && clickedFilter !== 'All Tasks') {
            setFilteredTasks(allTasks);
        } else if (type === 'Important') {
            setFilteredTasks(allTasks.filter(
                (task) => task.importance === 'High' || task.importance === 'Medium'
            ))
        }
    };
    const deleteTaskHandler = async (taskId) => {
        const response = await deleteTask(taskId);
        if (!response.error) {
            // Remove the deleted task from the task list
            setFilteredTasks((prevTasks) =>
                prevTasks.filter((task) => task._id !== taskId)
            );
            setCurrentTaskClick();
        }
    };
    const setDoneTask = async (taskId) => {
        await setTaskAsDone(taskId)
        setFilteredTasks((prevTasks) =>
            prevTasks.filter((task) => task._id !== taskId)
        );
        setCurrentTaskClick();

    }

    const handleDownload = useCallback(
        (type) => {
            let dataString;
            console.log(filteredTasks)
            if (type === 'completed') {
                dataString = JSON.stringify(
                    completedTasks,
                    null,
                    2
                );
            } else if (type === 'tasks') {
                dataString = JSON.stringify(
                    filteredTasks,
                    null,
                    2
                );
            }
            const blob = new Blob([dataString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'tasks.json';
            link.click();
            URL.revokeObjectURL(url);
        },
        [filteredTasks]
    );

    return (
        <div className="home__container">
            <InfoPanel handleDownload={handleDownload} />
            <div className="main__panel">
                <div className="main__info__panel">
                    <h1>{clickedFilter}</h1>
                    <div className="switchable">
                        <button className={clickedFilter == 'All Tasks' ? 'clicked_filter' : ''} onClick={() => sortTasks('All Tasks')}>All Tasks</button>
                        <button className={clickedFilter == 'Today' ? 'clicked_filter' : ''} onClick={() => sortTasks('Today')}>Today</button>
                        <button className={clickedFilter == 'Important' ? 'clicked_filter' : ''} onClick={() => sortTasks('Important')}>Important</button>
                    </div>
                </div>
                <div className="tasks">
                    <div className="tasks__panel">
                        {!isLoading && (
                            <>
                                {allTasks.length == 0 ? (
                                    <h1 className='empty'>No current tasks!</h1>
                                ) : (
                                    filteredTasks.map((task) => {
                                        return <TaskCard key={task._id} setCurrentTaskClick={setCurrentTaskClick} task={task} setDoneTask={setDoneTask} />
                                    })
                                )}
                            </>
                        )}

                    </div>
                    <div className="task__overview">
                        <h1>Task Overview</h1>
                        <span className='info'>Click on task to see information</span>
                        <img src="./tasks2.jpg" />
                        {currentTaskClick && <TaskOverview task={currentTaskClick} deleteTaskHandler={deleteTaskHandler} setDoneTask={setDoneTask} />}
                    </div>
                </div>
            </div>
        </div>
    );

}
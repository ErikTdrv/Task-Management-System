const Task = require('../models/Task');
const User = require('../models/User');

const addTask = async (taskData, userId) => {
    try {
        const task = await Task.create(taskData);
        await User.updateOne({_id: userId}, {$push: {addedTasks: task}});
        // const taskArray = (user.addedTasks).push(task._id);
        // await User.findByIdAndUpdate(userId, {addedTasks: taskArray})
        return task
    } catch (error) {
        throw new Error(error);
    }
};
const getAllTasks = async (taskId) => {
    try {
        const tasks = await User.findById(taskId).populate('addedTasks');
        return tasks.addedTasks
    } catch (error) {
        throw new Error(error)
    }
}
const getOneTask = async (taskId) => {
    try {
        const task = await Task.findById(taskId).populate('owner');
        return task
    } catch (error) {
        throw new Error(error)
    }
}
const editOneTask = async (taskData) => {
    try {
        const task = await Task.findByIdAndUpdate(taskData._id, taskData)
        return task
    } catch (error) {
        throw new Error(error);
    }
}
const deleteOneTask = async (taskId) => {
    try {
        const task = await Task.findByIdAndDelete(taskId)
        return task
    } catch (error) {
        throw new Error(error);
    }
}
const setTaskAsDone = async (taskId, userId) => {
    try {
        await User.findByIdAndUpdate(userId, {
            $pull: { addedTasks: taskId },
            $push: { completedTasks: taskId }
          });
        await Task.findByIdAndUpdate(taskId, {isDone: true});
    } catch (error) {
        throw new Error(error);
    }
}
const getCompletedTasks = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user.completedTasks
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    addTask,
    getAllTasks,
    getOneTask,
    editOneTask, 
    deleteOneTask,
    setTaskAsDone,
    getCompletedTasks,
}
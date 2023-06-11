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
const getAllTasks = async (userId) => {
    try {
        const tasks = await User.findById(userId).populate('addedTasks');
        return tasks.addedTasks
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    addTask,
    getAllTasks,
}
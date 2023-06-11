const Task = require('../models/Task');

const addTask = async (taskData) => {
    try {
        const task = await Task.create(taskData);
        return task
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    addTask,
}
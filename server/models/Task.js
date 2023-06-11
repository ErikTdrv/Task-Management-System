const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        minlength: [6, 'Title must have at least 6 characters'],
        maxlength: [20, 'Title must not have more than 20 characters!'],
    },
    date: {
        required: true, 
        type: String,
    },
    hours: {
        required: true,
        type: String
    }, 
    minutes: {
        required: true,
        type: String,
    }, 
    description: {
        required: true,
        type: String,
        minlength: [20, 'Description must have at least 20 characters!'],
        maxlength: [60, 'Description must not have more than 60 characters!']
    }
});

const Task = new mongoose.model('Task', taskSchema);
module.exports = Task;
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        minlength: [6, 'Title must have at least 6 characters'],
        maxlength: [40, 'Title must not have more than 40 characters!'],
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
        maxlength: [300, 'Description must not have more than 300 characters!']
    },
    importance: {
        required: true,
        type: String,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
});

const Task = new mongoose.model('Task', taskSchema);
module.exports = Task;
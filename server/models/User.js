const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [2, 'Last Name must have at least 2 characters!'],
        maxlength: [10, 'Last Name must not have more than 10 characters!']
    },
    email: {
        type: String,
        required: true,
        minlength: [8, 'Email must have at least 8 characters!'],
        maxlength: [30, 'Email must not have more than 30 characters!'],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must have at least 6 characters!'],
        maxlength: [15, 'Password must not have more than 15 characters!'],
    },
    profilePicture: {
        type: String,
        required: true
    },
    imageId: {
        type: String,
        required: true
    },
    addedTasks: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Task",
        },
    ],
    completedTasks: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Task",
        },
    ],
})

userSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10).then((hash) => {
        this.password = hash;
        return next();
    });
});

const User = new mongoose.model('User', userSchema)
module.exports = User;
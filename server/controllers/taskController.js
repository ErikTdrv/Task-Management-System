const { addTask } = require('../services/taskService');

const router = require('express').Router();

    router.post('/add-task', async (req, res) => {
        const body = req.body;
        try {
            const task = await addTask(body);
            res.status(201).json(task);
        } catch (error) {
            console.log(error)
            res.status(400).json({error: error.message})
        }
    })
module.exports = router;
const { addTask, getAllTasks } = require('../services/taskService');

const router = require('express').Router();

router.get('/all-tasks', async (req, res) => {
    const userId = req.user._id;
    try {
        const tasks = await getAllTasks(userId);
        res.status(201).json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
router.post('/add-task', async (req, res) => {
    const body = req.body;
    body.owner = req.user._id;
    try {
        const task = await addTask(body, req.user._id);

        res.status(201).json(task);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})
module.exports = router;
const { addTask, getAllTasks, getOneTask, editOneTask, deleteOneTask, setTaskAsDone, getCompletedTasks } = require('../services/taskService');

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
router.delete('/task/:taskId', async (req, res) => {
    console.log('here')
    const taskId = req.params.taskId;
    try {
        const task = await deleteOneTask(taskId);
        res.status(201).json(task);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})
router.get('/task/:taskId/done', async (req, res) => {
    const userId = req.user._id;
    const taskId = req.params.taskId;
    try {
        await setTaskAsDone(taskId, userId)
        res.status(201).json({ok: true});
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})
router.get('/task/:taskId', async (req, res) => {
    const taskId = req.params.taskId;
    try {
        const task = await getOneTask(taskId);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
router.put('/task/:taskId', async (req, res) => {
    const body = req.body;
    try {
        const task = await editOneTask(body);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
router.post('/add-task', async (req, res) => {
    const body = req.body;
    body.owner = req.user._id;
    body.isDone = false;
    try {
        const task = await addTask(body, req.user._id);

        res.status(201).json(task);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})
router.get('/completed-tasks', async(req, res) => {
    const userId = req.user._id
    try {
        const tasks = await getCompletedTasks(userId);
        res.status(201).json(tasks);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})
module.exports = router;
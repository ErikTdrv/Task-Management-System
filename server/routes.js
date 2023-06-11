const router = require('express').Router();
const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');

router.use(authController);
router.use(taskController);

module.exports = router;
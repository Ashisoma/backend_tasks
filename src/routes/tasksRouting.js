const express = require('express');

const router = express.Router();
const taskController = require('../controllers/tasksController')
const isAuthenticated = require('../middlewares/authenticateToken')

// Get all tasks is open to public
router.route('/tasks').get(taskController.getAllTasks );

// The ones below are authenticated
router.route('/tasks/:id').get(isAuthenticated, taskController.getTaskById);
router.route('/tasks/:id').put(isAuthenticated, taskController.updateTask, );
router.route('/tasks/:id').delete(isAuthenticated, taskController.deleteTask);
router.route('/tasks').post(isAuthenticated, taskController.createTask,);

module.exports = router;
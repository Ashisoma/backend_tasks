const express = require('express');

const router = express.Router();
const taskController = require('../controllers/tasksController')

router.route('/tasks').get(taskController.getAllTasks);
router.route('/tasks/:id').get(taskController.getTaskById);
router.route('/tasks/:id').put(taskController.updateTask);
router.route('/tasks/:id').delete(taskController.deleteTask);
router.route('/tasks').post(taskController.createTask);

module.exports = router;
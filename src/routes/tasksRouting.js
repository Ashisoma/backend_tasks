const express = require('express');

const router = express.Router();
const taskController = require('../controllers/tasksController')

router.route('/tasks').get(taskController.getTaks);

module.exports = router;
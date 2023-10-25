const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController')

router.route('/register').post(authController.registerUser);
router.route('/login').post(authController.loginUser);
// router.route('/logout').post(taskController.updateTask);
// router.route('/tasks/:id').delete(taskController.deleteTask);
// router.route('/tasks').post(taskController.createTask);

module.exports = router;
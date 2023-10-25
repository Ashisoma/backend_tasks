const asyncHandler = require('express-async-handler');
const Tasks = require('../models/tasks');


const getAllTasks = asyncHandler(async (req, res) => {
  try {
    const tasks = await Tasks.find().sort({ createdAt: 1 });
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const getTaskById = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Tasks.findById(taskId);
    // Check if task is found
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Task is found
    res.status(200).json(task);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const createTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      res.status(400).send('All fields are mandatatory');
    }
    else {
      const task = await Tasks.create({
        title: title,
        description: description,
        status: false,
      });
      res.status(201).json(task);
    }
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({
      error: 'Internal Server Error'
    })

  }
});

const updateTask = asyncHandler(async (req, res) => {

  const taskId = req.params.id;
  const updateData = req.body; // Data to update the task

  try {
    // Find the task by ID and update it
    const updatedTask = await Tasks.findByIdAndUpdate(
      taskId,
      updateData,
      { new: true } // To get the updated document as a result
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({
      error: 'Internal Server Error'
    })

  }
});

// Delete a task by ID
const deleteTask = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {

    const deletedTask = await Tasks.findByIdAndRemove(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = {
  getAllTasks,
  getTaskById,
  updateTask,
  createTask,
  deleteTask
}
const asyncHandler = require('express-async-handler');
const Tasks = require('../models/tasks');


const getAllTasks = asyncHandler( async (req, res) => {
    try {
        const tasks = await Tasks.find({
            order: [['created_at', 'ASC']]
        })
      res.status(200).json(tasks);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  const getTaskById = asyncHandler( async (req, res) => {
    const { id } = req.body.id;
    try {
      const task = await Tasks.findById(id);
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

  const createTask = asyncHandler (async (req, res) => {
    try {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      res.status(400).send('All fields are mandatatory');
    }
    else{
      await Tasks.create({
        title: title,
        description: description,
        status: status,
    })
        .then((user) => {
            res.status(201).json({ 
                username: user.username, 
                email: user.email, 
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error:'Internal Server Error'
        })
        
    }
  });

  const updateTask = asyncHandler (async (req, res) => {
    
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
            error:'Internal Server Error'
        })
        
    }
  });

module.exports = {
    getAllTasks,
    getTaskById,
    updateTask,
    createTask
}
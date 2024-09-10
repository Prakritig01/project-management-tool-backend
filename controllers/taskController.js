const Task = require('../models/taskModel');


const addTask = (req, res) => {
    const taskData = req.body;

    // Create a new task based on the data received
    const newTask = new Task({
        title: taskData.title,
        description: taskData.description,
        deadline: taskData.deadline,
        priority: taskData.priority,
        status: taskData.status,
        members: taskData.members // Reference to the assigned member's ID
    });

    newTask.save()
        .then((result) => {
            res.status(201).json({ message: 'Task added successfully', task: result });
        })
        .catch((err) => {
            console.error('Error adding task:', err);
            res.status(500).json({ message: 'Failed to add task' });
        });
};


const getAllTasks = (req, res) => {
    Task.find()  // Fetch all tasks from the database
        .sort({ createdAt: -1 })  // Sort by 'createdAt' in descending order
        .then((tasks) => {
            res.status(200).json(tasks);  // Send tasks as JSON response
        })
        .catch((err) => {
            console.error('Error fetching tasks:', err);
            res.status(500).json({ error: 'Failed to retrieve tasks' });
        });
};

const deleteTask = (req, res) => {
    const taskId = req.params.id;
    Task.findByIdAndDelete(taskId)
        .then((result) => {
            res.status(200).json({ message: 'Task deleted successfully' });
        })
        .catch((err) => {
            console.error('Error deleting task:', err);
            res.status(500).json({ error: 'Failed to delete task' });
        });
}



module.exports = { addTask, getAllTasks, deleteTask };

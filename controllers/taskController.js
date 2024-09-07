const Task = require('../models/taskModel');


const addTask = (req, res) => {
    const taskData = req.body; // Extract the task data from the request body
    const newTask = new Task(taskData); // Create a new instance of the taskModel with the provided data
    
    // Save the task to the database
    newTask.save()
        .then((result) => {
            console.log(`New task added: ${result.title}`); // Log the title of the new task
            res.status(201).json({ message: 'Task added successfully', task: result }); // Send a success response with the new task data
            
        })
        .catch((err) => {
            console.log(err); // Log any errors
            res.status(500).json({ message: 'Failed to add task' }); // Send an error response
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



module.exports = {addTask, getAllTasks};

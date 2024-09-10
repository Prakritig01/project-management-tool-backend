const express = require('express');
const bodyParser = require('body-parser');
const taskController = require('../controllers/taskController');

const router = express.Router();

//POST request to add a new task
router.post('/addTask', taskController.addTask);

//GET request to fetch all tasks
router.get('/getAllTasks', taskController.getAllTasks);

//DELETE request to delete a task
router.delete('/deleteTask/:id', taskController.deleteTask);

//GET request to fetch total task count 
router.get('/task-count', taskController.getTotalTaskCount);

module.exports = router;
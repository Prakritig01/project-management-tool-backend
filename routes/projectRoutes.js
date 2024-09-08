const express = require('express');
const bodyParser = require('body-parser');

const projectController = require('../controllers/projectControllers');

const router = express.Router();

//POST request to add a new project
router.post('/addProject', projectController.addProject);

//GET request to fetch all projects
router.get('/getAllProjects', projectController.getAllProjects);


// DELETE request to delete a project by its ID
router.delete('/deleteProject/:id', projectController.deleteProject);

module.exports = router;


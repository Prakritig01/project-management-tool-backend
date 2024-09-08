const express = require('express');
const bodyParser = require('body-parser');

const projectController = require('../controllers/projectControllers');

const router = express.Router();

//POST request to add a new project
router.post('/addProject', projectController.addProject);

//GET request to fetch all projects
router.get('/getAllProjects', projectController.getAllProjects);

module.exports = router;


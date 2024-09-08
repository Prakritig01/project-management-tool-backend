const Project = require('../models/projectModel');

const addProject = (req,res)=>{
    const projectData = req.body;
    const newProject = new Project(projectData);
    newProject.save()
        .then((result) => {
            console.log(`New project added: ${result.name}`);
            res.status(201).json({ message: 'Project added successfully', project: result });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Failed to add project' });
        });

};

const getAllProjects = (req,res) => {
    Project.find()
        .sort({createdAt: -1})
        .then((projects) => {
            res.status(200).json(projects);
        })
        .catch((err) => {
            console.error('Error fetching projects:', err);
            res.status(500).json({ error: 'Failed to retrieve projects' });
        });
};

module.exports = {addProject, getAllProjects};

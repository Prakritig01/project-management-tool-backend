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
            console.log('Projects fetched:', projects);
            res.status(200).json(projects);
        })
        .catch((err) => {
            console.error('Error fetching projects:', err);
            res.status(500).json({ error: 'Failed to retrieve projects' });
        });
};


// Add this function to delete a project by its ID
const deleteProject = (req, res) => {
    const projectId = req.params.id;

    Project.findByIdAndDelete(projectId)
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: 'Project not found' });
            }
            res.status(200).json({ message: 'Project deleted successfully', project: result });
        })
        .catch((err) => {
            console.error('Error deleting project:', err);
            res.status(500).json({ message: 'Failed to delete project' });
        });
};

module.exports = {addProject, getAllProjects,deleteProject};

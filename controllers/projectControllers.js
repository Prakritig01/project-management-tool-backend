const Project = require('../models/projectModel');

const addProject = (req, res) => {
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

const getAllProjects = (req, res) => {
    Project.find()
        .sort({ createdAt: -1 })
        .then((projects) => {
            res.status(200).json(projects);
        })
        .catch((err) => {
            console.error('Error fetching projects:', err);
            res.status(500).json({ error: 'Failed to retrieve projects' });
        });
};

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

// Assign a manager to a specific project
const getAssignedManagers = (req, res) => {
    Project.find({ manager: { $ne: null } }) // Find projects where manager is not null
        .select('manager') // Only select the manager field
        .then((projects) => {
            const assignedManagers = projects.map((project) => project.manager); // Get list of assigned manager IDs
            res.status(200).json(assignedManagers);
        })
        .catch((err) => {
            console.error('Error fetching assigned managers:', err);
            res.status(500).json({ message: 'Failed to fetch assigned managers' });
        });
};

module.exports = { addProject, getAllProjects, deleteProject, getAssignedManagers };

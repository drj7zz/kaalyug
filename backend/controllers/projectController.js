const Project = require('../models/Project');

// @desc    Fetch all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({}).populate('author', 'name email');
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
    try {
        const { name, description, category, tag, price, symbol, previewClass, githubUrl } = req.body;

        if (!name || !description || !category || !tag || !symbol || !previewClass) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const project = new Project({
            name,
            description,
            category,
            tag,
            price: price || 'FREE',
            symbol,
            previewClass,
            githubUrl,
            author: req.user._id
        });

        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getProjects,
    createProject
};

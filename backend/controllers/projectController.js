const Project = require('../models/Project');

// @desc    Fetch all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({});
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getProjects
};

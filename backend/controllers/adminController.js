const User = require('../models/User');
const Project = require('../models/Project');

// @desc    Return safe dashboard data for administrators
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboard = async (_req, res) => {
    try {
        const [userCount, projectCount, recentUsers, recentProjects] = await Promise.all([
            User.countDocuments(),
            Project.countDocuments(),
            User.find().select('_id name email role createdAt').sort({ createdAt: -1 }).limit(8),
            Project.find().select('_id name category price createdAt').sort({ createdAt: -1 }).limit(8)
        ]);

        res.json({ userCount, projectCount, recentUsers, recentProjects });
    } catch (_error) {
        res.status(500).json({ message: 'Unable to load the admin dashboard' });
    }
};

module.exports = { getDashboard };

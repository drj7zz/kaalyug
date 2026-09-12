const express = require('express');
const router = express.Router();
const { getProjects, createProject, getMyProjects } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.get('/mine', protect, getMyProjects);

router.route('/')
    .get(getProjects)
    .post(protect, createProject);

module.exports = router;

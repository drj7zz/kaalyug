const express = require('express');
const { getDashboard } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/dashboard', protect, adminOnly, getDashboard);

module.exports = router;

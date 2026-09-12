const express = require('express');
const router = express.Router();

const { protect, adminOnly } = require('../middleware/authMiddleware');
const consoleCtrl = require('../controllers/adminConsoleController');
const { getDashboard } = require('../controllers/adminController');

// All /console-api/admin/console/* endpoints are admin-only.
// We piggy-back on the existing JWT auth — console is just an alternate URL
// shape, not a new auth provider.
router.use(protect, adminOnly);

// Re-export the existing /api/admin/dashboard payload so the panel can fall
// back to it if the new overview fails. Same auth, just re-mounted.
router.get('/dashboard', getDashboard);

// CRM endpoints
router.get('/overview', consoleCtrl.getOverview);
router.get('/users', consoleCtrl.listUsers);
router.patch('/users/:id', consoleCtrl.updateUser);
router.delete('/users/:id', consoleCtrl.deleteUser);

router.get('/projects', consoleCtrl.listProjects);
router.delete('/projects/:id', consoleCtrl.deleteProject);

router.get('/wallets', consoleCtrl.listWallets);
router.get('/transactions', consoleCtrl.listTransactions);

router.get('/system', consoleCtrl.getSystem);

module.exports = router;

/**
 * Admin Console API.
 *
 * Drives the macOS-style panel rendered at /console on the frontend. Every
 * endpoint here intentionally lives on a separate URL prefix (/console-api/*)
 * so it never collides with the public marketplace routes, and so operators
 * can lock it down at the proxy/middleware layer (CONSOLE_API_KEY, IP allow-
 * list, etc) without affecting /api/* traffic.
 *
 * Authorization is enforced in routes via the existing `protect` + `adminOnly`
 * middleware, identical to /api/admin/dashboard. We deliberately do NOT add a
 * new auth path — there's no reason to invent one when the JWT pipeline works.
 */
const User = require('../models/User');
const Project = require('../models/Project');
const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const Payment = require('../models/Payment');
const mongoose = require('mongoose');

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

// ---------------------------------------------------------------------------
// Read-only overviews used by the CRM landing strip.
// ---------------------------------------------------------------------------

// GET /console-api/admin/console/overview
// Aggregates everything the chrome needs at once (counts, activity, health).
const getOverview = async (_req, res, next) => {
    try {
        const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const [
            userCount,
            projectCount,
            walletCount,
            transactionCount,
            paymentCount,
            adminCount,
            newUsers24h,
            newProjects24h,
            recentActivity,
            walletSumAgg,
        ] = await Promise.all([
            User.countDocuments(),
            Project.countDocuments(),
            Wallet.countDocuments(),
            Transaction.countDocuments(),
            Payment.countDocuments(),
            User.countDocuments({ role: 'admin' }),
            User.countDocuments({ createdAt: { $gte: since24h } }),
            Project.countDocuments({ createdAt: { $gte: since24h } }),
            Transaction.find().sort({ createdAt: -1 }).limit(6).select('userId type amount description balanceAfter createdAt'),
            Wallet.aggregate([{ $group: { _id: null, total: { $sum: '$balance' } } }]),
        ]);

        const totalBalance = walletSumAgg[0]?.total ?? 0;

        return res.json({
            status: true,
            data: {
                counts: {
                    users: userCount,
                    projects: projectCount,
                    wallets: walletCount,
                    transactions: transactionCount,
                    payments: paymentCount,
                    admins: adminCount,
                },
                last24h: { newUsers: newUsers24h, newProjects: newProjects24h },
                totals: { walletBalance: totalBalance },
                recentActivity,
                serverTime: new Date().toISOString(),
            },
        });
    } catch (error) {
        next(error);
    }
};

// ---------------------------------------------------------------------------
// Users tab
// ---------------------------------------------------------------------------

// GET /console-api/admin/console/users?page=1&limit=20&q=...
const listUsers = async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.min(100, parseInt(req.query.limit, 10) || 20);
        const q = (req.query.q || '').trim();
        const filter = q
            ? { $or: [
                { name: new RegExp(q, 'i') },
                { email: new RegExp(q, 'i') },
            ] }
            : {};

        const [rows, total] = await Promise.all([
            User.find(filter)
                .select('_id name email role createdAt')
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit),
            User.countDocuments(filter),
        ]);

        return res.json({ status: true, data: { rows, total, page, limit } });
    } catch (error) {
        next(error);
    }
};

// PATCH /console-api/admin/console/users/:id   body: { role?, name? }
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ status: false, message: 'Invalid user id' });
        }
        const updates = {};
        if (typeof req.body.role === 'string' && ['user', 'admin'].includes(req.body.role)) {
            updates.role = req.body.role;
        }
        if (typeof req.body.name === 'string' && req.body.name.trim().length >= 2) {
            updates.name = req.body.name.trim();
        }
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ status: false, message: 'Nothing to update' });
        }

        const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('_id name email role createdAt');
        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }
        return res.json({ status: true, data: user });
    } catch (error) {
        next(error);
    }
};

// DELETE /console-api/admin/console/users/:id
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ status: false, message: 'Invalid user id' });
        }
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }
        // Cascade: drop their wallet + transactions. We don't delete their
        // published projects — they survive with author=null until reassigned.
        await Promise.all([
            Wallet.deleteOne({ userId: id }),
            Transaction.deleteMany({ userId: id }),
            Project.updateMany({ author: id }, { $set: { author: null } }),
        ]);
        return res.json({ status: true, data: { id } });
    } catch (error) {
        next(error);
    }
};

// ---------------------------------------------------------------------------
// Projects tab
// ---------------------------------------------------------------------------

// GET /console-api/admin/console/projects?page=1&limit=20&q=...
const listProjects = async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.min(100, parseInt(req.query.limit, 10) || 20);
        const q = (req.query.q || '').trim();
        const filter = q
            ? { $or: [
                { name: new RegExp(q, 'i') },
                { description: new RegExp(q, 'i') },
                { category: new RegExp(q, 'i') },
                { tag: new RegExp(q, 'i') },
            ] }
            : {};

        const [rows, total] = await Promise.all([
            Project.find(filter)
                .populate('author', 'name email')
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit),
            Project.countDocuments(filter),
        ]);

        return res.json({ status: true, data: { rows, total, page, limit } });
    } catch (error) {
        next(error);
    }
};

// DELETE /console-api/admin/console/projects/:id
const deleteProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ status: false, message: 'Invalid project id' });
        }
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({ status: false, message: 'Project not found' });
        }
        return res.json({ status: true, data: { id } });
    } catch (error) {
        next(error);
    }
};

// ---------------------------------------------------------------------------
// Wallet tab
// ---------------------------------------------------------------------------

// GET /console-api/admin/console/wallets?page=1&limit=20
const listWallets = async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.min(100, parseInt(req.query.limit, 10) || 20);
        const [rows, total, sumAgg] = await Promise.all([
            Wallet.find().sort({ balance: -1 }).skip((page - 1) * limit).limit(limit),
            Wallet.countDocuments(),
            Wallet.aggregate([{ $group: { _id: null, total: { $sum: '$balance' } } }]),
        ]);
        // hydrate the user names for display
        const userIds = [...new Set(rows.map((w) => w.userId).filter(Boolean))];
        const users = await User.find({ _id: { $in: userIds } }).select('_id name email');
        const byId = Object.fromEntries(users.map((u) => [String(u._id), u]));
        const enriched = rows.map((w) => ({ ...w.toObject(), user: byId[String(w.userId)] ?? null }));
        return res.json({ status: true, data: { rows: enriched, total, totalBalance: sumAgg[0]?.total ?? 0, page, limit } });
    } catch (error) {
        next(error);
    }
};

// GET /console-api/admin/console/transactions?page=1&limit=20
const listTransactions = async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.min(100, parseInt(req.query.limit, 10) || 20);
        const [rows, total] = await Promise.all([
            Transaction.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
            Transaction.countDocuments(),
        ]);
        return res.json({ status: true, data: { rows, total, page, limit } });
    } catch (error) {
        next(error);
    }
};

// ---------------------------------------------------------------------------
// System tab — read-only introspection, useful for sanity checks.
// ---------------------------------------------------------------------------

// GET /console-api/admin/console/system
const getSystem = async (_req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionStats = await Promise.all(
            collections.slice(0, 20).map(async (c) => {
                try {
                    const stats = await mongoose.connection.db.collection(c.name).estimatedDocumentCount();
                    return { name: c.name, docs: stats };
                } catch {
                    return { name: c.name, docs: null };
                }
            })
        );

        const nodeInfo = {
            nodeVersion: process.version,
            pid: process.pid,
            uptimeSec: Math.round(process.uptime()),
            memoryRssMb: Math.round(process.memoryUsage().rss / 1024 / 1024),
            memoryHeapMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
            env: process.env.NODE_ENV || 'development',
        };

        return res.json({
            status: true,
            data: {
                node: nodeInfo,
                mongodb: {
                    database: mongoose.connection?.name || null,
                    state: mongoose.connection?.readyState ?? 0,
                    collections: collectionStats,
                },
                now: new Date().toISOString(),
            },
        });
    } catch (error) {
        // System endpoint should never break the panel. Return a fallback.
        return res.json({
            status: true,
            data: {
                node: { error: error.message },
                mongodb: { collections: [] },
                now: new Date().toISOString(),
            },
        });
    }
};

module.exports = {
    getOverview,
    listUsers,
    updateUser,
    deleteUser,
    listProjects,
    deleteProject,
    listWallets,
    listTransactions,
    getSystem,
};

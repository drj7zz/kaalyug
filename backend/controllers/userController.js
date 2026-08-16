const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

const userResponse = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id)
});

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please include all fields' });
    }
    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        if (user) {
            res.status(201).json(userResponse(user));
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'An account with this email already exists' });
        }
        res.status(500).json({ message: 'Unable to create account' });
    }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email }).select('+password');

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json(userResponse(user));
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Unable to sign in' });
    }
};

const getCurrentUser = async (req, res) => {
    res.json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    });
};

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser
};

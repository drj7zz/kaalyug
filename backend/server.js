const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const configuredOrigins = process.env.CLIENT_ORIGIN?.split(',').map((origin) => origin.trim()).filter(Boolean) || [];
const isAllowedOrigin = (origin) => {
    if (!origin) return true;
    if (configuredOrigins.includes(origin)) return true;
    // Local Vite development and Vercel preview/production deployments.
    return /^https?:\/\/localhost(?::\d+)?$/.test(origin) || /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
};

app.disable('x-powered-by');
app.use(cors({
    origin(origin, callback) {
        // Requests without an Origin header (health checks and server-to-server calls) are allowed.
        if (isAllowedOrigin(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Origin is not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    optionsSuccessStatus: 204
}));
app.use(express.json({ limit: '100kb' }));

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Kaalyug API is running' });
});

app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Routes placeholders
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
// app.use('/api/wallet', require('./routes/walletRoutes'));

app.use((err, _req, res, _next) => {
    if (err.message === 'Origin is not allowed by CORS') {
        return res.status(403).json({ message: 'Origin is not allowed' });
    }
    return res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

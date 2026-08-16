const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = process.env.CLIENT_ORIGIN?.split(',').map((origin) => origin.trim()).filter(Boolean);

app.disable('x-powered-by');
app.use(cors({ origin: allowedOrigins?.length ? allowedOrigins : true }));
app.use(express.json({ limit: '100kb' }));

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Kaalyug API is running' });
});

// Routes placeholders
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/wallet', require('./routes/walletRoutes'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

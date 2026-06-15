const express = require('express');
const app = express();
const path = require('path');

require('dotenv').config();

app.set('trust proxy', 1);

const router = require('./routes/api');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// DB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommarce';
mongoose.connect(MONGO_URI)
    .then(() => console.log("Database Connected"))
    .catch(err => console.log(err));

// CORS - allow Vercel frontend + localhost dev
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json({ limit: '54mb' }));
app.use(express.urlencoded({ limit: '54mb', extended: true }));
app.use(cookieParser());
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rate limiting
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 2000 });
app.use('/api/v1/LoginWithPassword', authLimiter);
app.use('/api/v1/Register', authLimiter);
app.use('/api/v1', apiLimiter);

// Routes
app.use('/api/v1', router);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5020;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

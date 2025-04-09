require('dotenv').config()
const express = require("express")
const cors = require('cors')
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db')
const passport = require('passport')
require('./config/googleAuth')

const app = express()
const port = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize()); // ✅ Required to use any passport strategy

// Routes
const userRoutes = require("./src/routes/userRoutes")
app.use('/api/users', userRoutes)

const businessRoutes = require('./src/routes/businessRoutes')
app.use('/api/business', businessRoutes)

const dealRoutes = require('./src/routes/dealRoutes')
app.use('/api/deals', dealRoutes)

const reviewRoutes = require('./src/routes/reviewRoutes')
app.use('/api/reviews', reviewRoutes)

const authRoutes = require('./src/routes/authRoutes')
app.use('/api/auth', authRoutes)

const reportedDealRoutes = require('./src/routes/reportedDealRoutes')
app.use('/api/report', reportedDealRoutes)

const adminRoutes = require('./src/routes/adminRoutes')
app.use('/api/admin', adminRoutes)

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Start Server
app.listen(port, () => {
    console.log(`🖥️  Server running at\x1b[34m http://localhost:${port}\x1b[0m`);
})

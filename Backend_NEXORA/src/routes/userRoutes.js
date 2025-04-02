// Import required modules
const express = require('express');
const { registerUser, getUserProfile, updateUserProfile, deleteUserAccount } = require('../controllers/userController');
const { authenticateUser, authorizeRole } = require('../middlewares/authMiddleware');

// Create an Express Router
const router = express.Router();

// Public Routes (No Authentication Required)
router.post('/register', registerUser); // User Registration

// Protected Routes (Authentication Required)
router.get('/profile', authenticateUser, getUserProfile); // View User Profile
router.put('/profile', authenticateUser, updateUserProfile); // Update User Profile
router.delete('/profile', authenticateUser, deleteUserAccount); // Delete User Account


// Export the Router
module.exports = router;
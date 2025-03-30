// const routes = require('express').Router()
// const userController = require('../controllers/user_Controller')

// routes.post("/signup", userController.addUsers)
// routes.get("/", userController.getUsers)
// routes.post("/login", userController.findUser)
// routes.get("/:id", userController.getUserByID)
// routes.delete("/deleteuser/:id", userController.deleteUserById)
// module.exports = routes

// Import required modules
const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserAccount, logoutUser } = require('../controllers/userController');
const { authenticateUser, authorizeRole } = require('../middlewares/authMiddleware');

// Create an Express Router
const router = express.Router();

// Public Routes (No Authentication Required)
router.post('/api/register', registerUser); // User Registration
router.post('/api/login', loginUser);       // User Login

// Protected Routes (Authentication Required)
router.get('/api/profile', authenticateUser, getUserProfile); // View User Profile
router.put('/api/profile', authenticateUser, updateUserProfile); // Update User Profile
router.delete('/api/profile', authenticateUser, deleteUserAccount); // Delete User Account

router.post('/api/logout', authenticateUser, logoutUser)//Logout User Account

// Export the Router
module.exports = router;
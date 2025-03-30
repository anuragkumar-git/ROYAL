// Import necessary modules
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating tokens
const User = require('../models/userModel'); // Import User model
require('dotenv').config(); // Load environment variables
const blackListModel = require('../models/tokenBlacklistModel')

// User Registration Controller
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Save user to the database
    await newUser.save();

    // Send success response
    res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User Login Controller
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the entered password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token for authentication
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expiration time
    );
    res.cookie('token', token)
    // Send success response with token
    res.status(200).json({ message: 'Login successful', token, user,role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Profile Controller
const getUserProfile = async (req, res) => {
  try {

    const userId = req.user._id; // Extract userId from the request after authentication

    // Fetch user data excluding the password
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user data
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update user profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from the authenticated token

    const { name, email, password } = req.body;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user data
    user.name = name || user.name;
    user.email = email || user.email;

    // Hash new password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Save updated user to database
    const updatedUser = await user.save();

    // Send success response
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      message: 'Profile updated successfully',
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete user account
const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from token

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete user from database
    await User.deleteOne({ _id: userId });
    res.clearCookie('token');
    res.status(200).json({ message: 'Account deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res, next) => {
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  // const token = req.headers.authorization?.split(' ')[1];
  await blackListModel.create({ token })
  res.status(200).json({ msg: "Logged out" })
}

// Export all controllers
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  logoutUser
};

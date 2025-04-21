// Import necessary modules
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating tokens
const User = require('../models/userModel'); // Import User model
const Deal = require('../models/dealModel'); // Import User model
require('dotenv').config(); // Load environment variables
const blacklistTokenModel = require('../models/blacklistTokenModel');
const { generateToken, blackListToken } = require('../utils/tokenUtils');

// User Registration Controller
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the email already exists
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return res.status(400).json({ message: 'Email already exists' });
    // }
    const validRoles = ['user', 'business', 'admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
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
    console.log(`Registered user ${newUser._id}, role: ${role}`);
    // Send success response
    res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
  } catch (error) {
    if (error.code === 11000) {
      // Mongoose E11000 error - Duplicate key
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error('registerUser:', error);
    res.status(500).json({ message: error.message });
  }
};

// // User Login Controller
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if the user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Compare the entered password with the hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Generate JWT token for authentication
//     const token = await generateToken(user);
//     if (!token) return res.status(500).json({ message: 'Token generation failed' });

//     // Set secure cookie
//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//     });
//     // Send success response with token
//     res.status(200).json({ message: 'Login successful', token, id: user._id, role: user.role });
//   } catch (error) {
//     console.error('loginUser:', error);
//     res.status(500).json({ message: 'Error logging in', error: error.message });
//   }
// };

// Get User Profile Controller
const getUserProfile = async (req, res) => {
  try {

    const userId = req.user._id; // Extract userId from the request after authentication

    // Fetch user data excluding the password
    const user = await User.findById(userId).select('-password').populate('savedDealCount redeemedDealCount').lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user data
    res.status(200).json(user);
  } catch (error) {
    console.error('getUserProfile:', error);
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
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
    console.error('updateUserProfile:', error);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
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
    await User.findByIdAndDelete(userId);
    // Blacklist token
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (token) {
      // Query: Saves new blacklistToken document
      await blackListToken(token);
    }
    res.clearCookie('token');
    res.status(200).json({ message: 'Account deleted successfully' });

  } catch (error) {
    console.error('deleteUserAccount:', error);
    res.status(500).json({ message: 'Error deleting account', error: error.message });
  }
};

// const logoutUser = async (req, res, next) => {
//   try {
//     const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
//     if (token) {
//       // Query: Saves new blacklistToken document
//       await blackListToken(token);
//     }
//     res.clearCookie('token');
//     res.status(200).json({ message: 'Logged out successfully' });
//   } catch (error) {
//     console.error('logoutUser:', error);
//     res.status(500).json({ message: 'Error logging out', error: error.message });
//   }
// }

// Save Deal
const saveDeal = async (req, res) => {
  try {
    const userId = req.user._id;
    const { dealId } = req.body;

    // Verify deal exists
    // Query: Finds one Deal document by _id
    const deal = await Deal.findById(dealId);
    // if (!deal || !deal.isActive || !deal.verified) {
    if (!deal || !deal.isActive) {
      return res.status(400).json({ message: 'Invalid or inactive deal' });
    }

    // Add deal to savedDeals
    // Query: Updates User document, adds dealId to savedDeals array
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { savedDeals: { dealId } } },
      { new: true }
    ).select('-password');

    // Increment deal saves
    // Query: Updates Deal document, increments saves
    await Deal.findByIdAndUpdate(dealId, { $inc: { saves: 1 } });

    res.status(200).json({ message: 'Deal saved successfully', user });
  } catch (error) {
    console.error('saveDeal:', error);
    res.status(500).json({ message: 'Error saving deal', error: error.message });
  }
};

// Redeem Deal
const redeemDeal = async (req, res) => {
  try {
    const userId = req.user._id;
    const { dealId } = req.body;
    console.log('redeemDeal(dealId):', dealId);


    // Verify deal exists
    // Query: Finds one Deal document by _id
    const deal = await Deal.findById(dealId);
    // if (!deal || !deal.isActive || !deal.verified) {
    if (!deal || !deal.isActive) {
      return res.status(400).json({ message: 'Invalid or inactive deal' });
    }

    // Check redemption limits
    if (deal.redemptionLimit <= deal.redemptionCount) {
      return res.status(400).json({ message: 'Redemption limit reached' });
    }

    // Check if already redeemed
    // Query: Finds one User document by _id, checks redeemedDeals
    const user = await User.findById(userId);
    if (user.redeemedDeals.some(d => d.dealId.equals(dealId))) {
      return res.status(400).json({ message: 'Deal already redeemed' });
    }

    // Add to redeemedDeals
    // Query: Updates User document, adds dealId to redeemedDeals array
    await User.findByIdAndUpdate(
      userId,
      { $push: { redeemedDeals: { dealId, redeemedAt: new Date() } } },
      { new: true }
    );

    // Increment deal redemptionCount
    // Query: Updates Deal document, increments redemptionCount
    await Deal.findByIdAndUpdate(dealId, { $inc: { redemptionCount: 1 } });

    res.status(200).json({ message: 'Deal redeemed successfully' });
  } catch (error) {
    console.error('redeemDeal:', error);
    res.status(500).json({ message: 'Error redeeming deal', error: error.message });
  }
};


// Export all controllers
module.exports = {
  // loginUser,
  // logoutUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  saveDeal,
  redeemDeal
};

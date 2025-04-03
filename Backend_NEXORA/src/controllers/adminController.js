const User = require('../models/userModel');
const Business = require('../models/businessModel');
const Deal = require('../models/dealModel');
const Review = require('../models/reviewModel');
const ReportedDeal = require('../models/reportedDeals');
const AdminActivity = require('../models/adminActivityModel')

const getDashboardStats = async (req, res) => {
  try {
    // Fetch statistics using MongoDB's countDocuments()
    const totalUsers = await User.countDocuments();
    const totalBusinesses = await Business.countDocuments();
    const totalDeals = await Deal.countDocuments();
    const totalReviews = await Review.countDocuments();
    const reportedDeals = await ReportedDeal.countDocuments();
    
    // Count active deals
    const activeDeals = await Deal.countDocuments({ isActive: true });

    // Count blocked users and businesses
    // const blockedUsers = await User.countDocuments({ status: 'blocked' });
    // const blockedBusinesses = await Business.countDocuments({ status: 'blocked' });

    // Return stats
    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalBusinesses,
        totalDeals,
        totalReviews,
        activeDeals,
        reportedDeals
        // blockedUsers,
        // blockedBusinesses
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: `Error fetching stats: ${error.message}` });
  }
};


/**
 * @desc Get all users
 * @route GET /api/admin/users
 * @access Admin
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({role:'user'}).select('-password -createdAt -updatedAt -preferences'); // Exclude password for security
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: `Error fetching users: ${error.message}` });
  }
};

/**
 * @desc Get all businesses
 * @route GET /api/admin/businesses
 * @access Admin
 */
const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find().select('-createdAt -updatedAt');
    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ message: `Error fetching businesses: ${error.message}` });
  }
};

/**
 * @desc Get user by ID
 * @route GET /api/admin/users/:id
 * @access Admin
 */
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: `Error fetching user: ${error.message}` });
  }
};

/**
 * @desc Get business by ID
 * @route GET /api/admin/businesses/:id
 * @access Admin
 */
const getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    res.status(200).json(business);
  } catch (error) {
    res.status(500).json({ message: `Error fetching business: ${error.message}` });
  }
};

/**
 * @desc Block or Unblock a user
 * @route PUT /api/admin/users/:id/block
 * @access Admin
 */
const toggleUserBlock = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.status(200).json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully` });
  } catch (error) {
    res.status(500).json({ message: `Error updating user status: ${error.message}` });
  }
};

/**
 * @desc Block or Unblock a business
 * @route PUT /api/admin/businesses/:id/block
 * @access Admin
 */
const toggleBusinessBlock = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    business.isBlocked = !business.isBlocked;
    await business.save();

    res.status(200).json({ message: `Business ${business.isBlocked ? 'blocked' : 'unblocked'} successfully` });
  } catch (error) {
    res.status(500).json({ message: `Error updating business status: ${error.message}` });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  getAllBusinesses,
  getUserById,
  getBusinessById,
  toggleUserBlock,
  toggleBusinessBlock
};


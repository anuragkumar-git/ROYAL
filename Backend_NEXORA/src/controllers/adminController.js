const User = require('../models/userModel');
const Business = require('../models/businessModel');
const Deal = require('../models/dealModel');
const Review = require('../models/reviewModel');
const ReportedDeal = require('../models/reportedDeals');

const getDashboardStats = async (req, res) => {
  try {
    // Fetch statistics using MongoDB's countDocuments()
    const totalUsers = await User.countDocuments();
    const totalBusinesses = await Business.countDocuments();
    const totalDeals = await Deal.countDocuments();
    const totalReviews = await Review.countDocuments();
    const reportedDeals = await ReportedDeal.countDocuments();
    const blockedUsers = await User.countDocuments({ isBlocked: true });
    const blockedBusinesses = await Business.countDocuments({ isBlocked: true });
    const activeDeals = await Deal.countDocuments({ isActive: true }); // Count active deals

    // Return stats
    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalBusinesses,
        totalDeals,
        totalReviews,
        activeDeals,
        reportedDeals,
        blockedUsers,
        blockedBusinesses
      }
    });
  } catch (error) {
    console.error('getDashboardStats:', error);
    res.status(500).json({ success: false, message: 'Error fetching stats', error: error.message });
  }
};


/**
 * @desc Get all users
 * @route GET /api/admin/users
 * @access Admin
 */
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const users = await User.find({ role: 'user' })
      .select('-password -updatedAt -preferences')
      .skip(skip)
      .limit(parseInt(limit))
      .lean();; // Exclude password for security

    const total = await User.countDocuments({ role: 'user' });
    res.status(200).json({
      success: true,
      data: users,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('getAllUsers:', error);
    res.status(500).json({ success: false, message: 'Error fetching users', error: error.message });
  }
};

/**
 * @desc Get all businesses
 * @route GET /api/admin/businesses
 * @access Admin
 */
const getAllBusinesses = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    // Find businesses
    // Query: Finds Business documents with pagination
    const businesses = await Business.find()
      .select('-updatedAt')
      .populate('ownerId', 'name')
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Count total
    // Query: Counts Business documents
    const total = await Business.countDocuments();

    res.status(200).json({
      success: true,
      data: businesses,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('getAllBusinesses:', error);
    res.status(500).json({ success: false, message: 'Error fetching businesses', error: error.message });
  }
};

/**
 * @desc Get user by ID
 * @route GET /api/admin/users/:id
 * @access Admin
 */
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password').lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('getUserById:', error);
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
    const business = await Business.findById(req.params.id).populate('ownerId', 'name').lean();
    if (!business) {
      return res.status(404).json({ success: false, message: 'Business not found' });
    }
    res.status(200).json({ success: true, data: business });
  } catch (error) {
    console.error('getBusinessById:', error);
    res.status(500).json({ success: false, message: 'Error fetching business', error: error.message });
  }
};

/**
 * @desc Block or Unblock a user
 * @route PUT /api/admin/users/:id/block
 * @access Admin
 */
const toggleUserBlock = async (req, res) => {
  try {
    // Prevent self-blocking
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'Cannot block own admin account' });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully`,
    })
  } catch (error) {
    console.error('toggleUserBlock:', error);
    res.status(500).json({ success: false, message: 'Error updating user status', error: error.message });
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

    res.status(200).json({
      success: true,
      message: `Business ${business.isBlocked ? 'blocked' : 'unblocked'} successfully`,
    });
  } catch (error) {
    console.error('toggleBusinessBlock:', error);
    res.status(500).json({ success: false, message: 'Error updating business status', error: error.message });
  }
};

// Approve Business
const approveBusiness = async (req, res) => {
  try {
    const { businessId, status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    // Find business
    // Query: Finds one Business document by _id
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ success: false, message: 'Business not found' });
    }

    // Update status
    business.status = status;
    // Query: Updates Business document
    await business.save();

  
    res.status(200).json({ success: true, message: `Business ${status} successfully` });
  } catch (error) {
    console.error('approveBusiness:', error);
    res.status(500).json({ success: false, message: 'Error approving business', error: error.message });
  }
};

// // Approve Deal
// const approveDeal = async (req, res) => {
//   try {
//     const { dealId, status } = req.body;
//     if (!['active', 'rejected'].includes(status)) {
//       return res.status(400).json({ success: false, message: 'Invalid status' });
//     }

//     // Find deal
//     // Query: Finds one Deal document by _id
//     const deal = await Deal.findById(dealId);
//     if (!deal) {
//       return res.status(404).json({ success: false, message: 'Deal not found' });
//     }

//     // Update deal
//     deal.dealStatus = status;
//     deal.verified = status === 'active';
//     // Query: Updates Deal document
//     await deal.save();

//     // Log activity
//     // Query: Saves new AdminActivity document
//     await AdminActivity.create({
//       adminId: req.user._id,
//       action: `Deal ${status}`,
//       targetId: dealId,
//     });

//     res.status(200).json({ success: true, message: `Deal ${status} successfully` });
//   } catch (error) {
//     console.error('approveDeal:', error);
//     res.status(500).json({ success: false, message: 'Error approving deal', error: error.message });
//   }
// };
// Get Reported Deals
const getReportedDeals = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    // Find reported deals
    // Query: Finds ReportedDeal documents with pagination
    const reportedDeals = await ReportedDeal.find()
      .populate('dealId', 'title')
      .populate('userId', 'name')
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Count total
    // Query: Counts ReportedDeal documents
    const total = await ReportedDeal.countDocuments();

    res.status(200).json({
      success: true,
      data: reportedDeals,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('getReportedDeals:', error);
    res.status(500).json({ success: false, message: 'Error fetching reported deals', error: error.message });
  }
};

// Resolve Reported Deal
const resolveReportedDeal = async (req, res) => {
  try {
    const { reportId, action } = req.body; // action: 'dismiss', 'reject'

    if (!['dismiss', 'reject'].includes(action)) {
      return res.status(400).json({ success: false, message: 'Invalid action' });
    }

    // Find report
    // Query: Finds one ReportedDeal document by _id
    const report = await ReportedDeal.findById(reportId).populate('dealId');
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    if (action === 'reject') {
      // Update deal
      // Query: Updates Deal document
      const deal = report.dealId;
      // deal.dealStatus = 'rejected';
      // deal.verified = false;
      deal.isActive = false;
      await deal.save();
    }

    // Delete report
    // Query: Deletes one ReportedDeal document
    await ReportedDeal.deleteOne({ _id: reportId });

    // // Log activity
    // // Query: Saves new AdminActivity document
    // await AdminActivity.create({
    //   adminId: req.user._id,
    //   action: `Reported deal ${action}ed`,
    //   targetId: report.dealId._id,
    // });

    res.status(200).json({ success: true, message: `Report ${action}ed successfully` });
  } catch (error) {
    console.error('resolveReportedDeal:', error);
    res.status(500).json({ success: false, message: 'Error resolving report', error: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  getAllBusinesses,
  getUserById,
  getBusinessById,
  toggleUserBlock,
  toggleBusinessBlock,
  approveBusiness,
  getReportedDeals,
  resolveReportedDeal
};


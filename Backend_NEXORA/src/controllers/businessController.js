// Importing necessary modules
const Business = require('../models/businessModel');
const User = require('../models/userModel');
const Deal = require('../models/dealModel');
const ReportedDeal = require('../models/reportedDeals');
const Review = require('../models/reviewModel');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { generateToken, blackListToken } = require('../utils/tokenUtils');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });

// Business Registration
const registerBusiness = async (req, res) => {
  try {
    // Validate request body using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, password, businessName, businessType, address } = req.body;

    // Check if the business already exists
    // const existingBusiness = await Business.findOne({ email });
    // if (existingBusiness) {
    //   return res.status(400).json({ message: 'Business with this email already exists' });
    // }


    //# Geocode address if no coordinates provided
    // let finalCoordinates = coordinates;
    // if (!coordinates && address) {
    //   const response = await geocodingClient
    //     .forwardGeocode({ query: address, limit: 1 })
    //     .send();
    //   finalCoordinates = response.body.features[0]?.geometry.coordinates; // [longitude, latitude]
    //   if (!finalCoordinates) {
    //     return res.status(400).json({ success: false, message: 'Invalid address' });
    //   }
    // }
    // if (!finalCoordinates) {
    //   return res.status(400).json({ success: false, message: 'Coordinates or valid address required' });
    // }



    // Geocode address to GeoJSON location using Mapbox
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_TOKEN}`
    );
    const data = await response.json();
    if (!data.features.length) {
      return res.status(400).json({ message: 'Invalid address.' });
    }
    const [long, lat] = data.features[0].center;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      // Create a new User (business owner) in User collection if not exsist
      const newUser = new User({ name, email, password: hashedPassword, role: 'business' });
      await newUser.save();
      const newBusiness = new Business({
        ownerId: newUser._id,
        businessName,
        businessType,
        email,
        phone,
        address,
        location: { type: 'Point', coordinates: [long, lat] },
        registrationNumber: `NEX-${crypto.randomBytes(4).toString('hex')}`,
        status: 'pending',
        verified: false,
      });
      await newBusiness.save();
      // Generate JWT for auto-login
      const token = await generateToken(newBusiness);
      if (!token) return res.status(500).json({ message: 'Token generation failed' });
      res.cookie('token', token, { httpOnly: true });
      console.log(`Registered business ${newBusiness._id} for new user ${newUser._id}`);
      return res.status(201).json({ message: 'new user Business registered successfully', newBusiness });
    }

    // Create a Business document in Business collection
    const newBusiness = new Business({
      ownerId: existingUser._id,
      businessName,
      businessType,
      email,
      phone,
      address,
      location: { type: 'Point', coordinates: [long, lat] },
      registrationNumber: `NEX-${crypto.randomBytes(4).toString('hex')}`,
      status: 'pending',
      verified: false,
    });

    await newBusiness.save();
    // Generate JWT for auto-login
    const token = await generateToken(newBusiness);
    if (!token) return res.status(500).json({ newBusiness: 'Token generation failed' });
    res.cookie('token', token, { httpOnly: true });
    console.log(`Registered business ${newBusiness._id} for exsisting user ${existingUser._id}`);
    res.status(201).json({ message: 'old user, Business registered successfully', newBusiness });

  } catch (error) {
    if (error.code === 11000) {
      // Mongoose E11000 error - Duplicate key
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ message: 'Error registering business', error: error.message });
  }
};

// Get Business Details
const getBusinessProfile = async (req, res) => {
  try {

    const businessId = req.user._id;

    // Find business using ID
    const business = await Business.findById(businessId).populate('ownerId', 'name email').populate('activeDeals');;

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.status(200).json({ business });

  } catch (error) {
    console.error('getBusinessProfile:', error);
    res.status(500).json({ message: 'Error fetching business details', error: error.message });
  }
};

// Update Business Profile
const updateBusinessProfile = async (req, res) => {
  try {
    const businessId = req.user._id;
    const { businessName, phone, address } = req.body;

    // Check if the business exists
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // Update fields if provided
    if (businessName) business.businessName = businessName;
    if (phone) business.phone = phone;
    if (address) business.address = address;
    // Re-geocode address
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_TOKEN}`
    );
    const data = await response.json();
    if (!data.features.length) {
      return res.status(400).json({ message: 'Invalid address.' });
    }
    const [long, lat] = data.features[0].center;
    business.location = { type: 'Point', coordinates: [long, lat] };

    await business.save();
    res.status(200).json({ message: 'Business profile updated successfully', business });

  } catch (error) {
    console.error('updateBusinessProfile:', error);
    res.status(500).json({ message: 'Error updating business profile', error: error.message });
  }
};

// Delete Business
const deleteBusinessAccount = async (req, res) => {
  try {
    const businessId = req.user._id;

    // Find and delete the business
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    await business.deleteOne();
    // Also delete the corresponding user from User collection
    await User.findByIdAndDelete(business.ownerId);

    // Blacklist token
    const token = req.cookies.token;
    if (token) {
      // Query: Saves new blacklistToken document
      await blackListToken(token);
    }
    res.clearCookie('token');
    res.status(200).json({ message: 'Business deleted successfully' });

  } catch (error) {
    console.error('deleteBusinessAccount:', error);
    res.status(500).json({ message: 'Error deleting business', error: error.message });
  }
};

// Get Business Dashboard
const getBusinessDashboard = async (req, res) => {
  try {
    const businessId = req.user._id;

    // Verify business
    // Query: Finds one Business document by _id
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ success: false, message: 'Business not found' });
    }
    if (business.isBlocked) {
      return res.status(403).json({ success: false, message: 'Business is blocked' });
    }

    // Count deals
    // Queries: Count Deal documents by businessId and status
    const totalDeals = await Deal.countDocuments({ businessId });
    // const activeDeals = await Deal.countDocuments({ businessId, dealStatus: 'active', verified: true });
    const activeDeals = await Deal.countDocuments({ businessId, isActive: true });
    const expiredDeals = await Deal.countDocuments({
      businessId,
      $or: [{ dealStatus: 'rejected' }, { expiresAt: { $lt: new Date() } }],
    });

    // Aggregate saves and redemptions
    // Query: Aggregates Deal documents for saves and redemptionCount
    const dealStats = await Deal.aggregate([
      { $match: { businessId: business._id } },
      {
        $group: {
          _id: null,
          totalSaves: { $sum: '$saves' },
          totalRedemptions: { $sum: '$redemptionCount' },
        },
      },
    ]);

    // Count reviews
    // Query: Counts Review documents for business's deals
    const totalReviews = await Review.countDocuments({ dealId: { $in: await Deal.find({ businessId }).distinct('_id') } });

    // Count reported deals
    // Query: Counts ReportedDeal documents for business's deals
    const reportedDeals = await ReportedDeal.countDocuments({ dealId: { $in: await Deal.find({ businessId }).distinct('_id') } });

    res.status(200).json({
      success: true,
      data: {
        totalDeals,
        activeDeals,
        expiredDeals,
        totalSaves: dealStats[0]?.totalSaves || 0,
        totalRedemptions: dealStats[0]?.totalRedemptions || 0,
        totalReviews,
        reportedDeals,
      },
    });
  } catch (error) {
    console.error('getBusinessDashboard:', error);
    res.status(500).json({ success: false, message: 'Error fetching dashboard stats', error: error.message });
  }
};


// Export all controllers
module.exports = {
  registerBusiness,
  getBusinessProfile,
  updateBusinessProfile,
  deleteBusinessAccount,
  getBusinessDashboard,
};
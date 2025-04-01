// Importing necessary modules
const Business = require('../models/businessModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistTokenModel');

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
    const existingBusiness = await Business.findOne({ email });
    if (existingBusiness) {
      return res.status(400).json({ message: 'Business with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      // Create a new User (business owner) in User collection if not exsist
      const newUser = new User({ name, email, password: hashedPassword, role: 'business' });
      await newUser.save();
      const newBusiness = new Business({
        ownerId:newUser._id,
        businessName,
        businessType,
        email,
        phone,
        address,
      });
      await newBusiness.save();
      return res.status(201).json({ message: 'new user Business registered successfully', newBusiness });
    }

    // Create a Business document in Business collection
    const newBusiness = new Business({
      ownerId:existingUser._id,
      businessName,
      businessType,
      email,
      phone,
      address,
    });

    await newBusiness.save();
    res.status(201).json({ message: 'old user Business registered successfully', newBusiness });

  } catch (error) {
    res.status(500).json({ message: 'Error registering business', error: error.message });
  }
};

// Get Business Details
const getBusinessProfile = async (req, res) => {
  try {
    // console.log("fromcontroller",req.business);

    const businessId = req.business._id;

    // Find business using ID
    const business = await Business.findById(businessId).populate('ownerId', 'name email');

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.status(200).json({ business });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching business details', error: error.message });
  }
};

// Update Business Profile
const updateBusinessProfile = async (req, res) => {
  try {
    const businessId = req.business._id;
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

    await business.save();
    res.status(200).json({ message: 'Business profile updated successfully', business });

  } catch (error) {
    res.status(500).json({ message: 'Error updating business profile', error: error.message });
  }
};

// Delete Business
const deleteBusinessAccount = async (req, res) => {
  try {
    const businessId = req.business._id;

    // Find and delete the business
    const business = await Business.findByIdAndDelete(businessId);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // Also delete the corresponding user from User collection
    await User.findByIdAndDelete(business.ownerId);

    res.clearCookie('token');
    res.status(200).json({ message: 'Business deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error deleting business', error: error.message });
  }
};

// Business Login
const loginBusiness = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the business owner exists
    const businessOwner = await User.findOne({ email, role: 'business' });
    if (!businessOwner) {
      return res.status(404).json({ message: 'Business owner not found' });
    }

    // Verify password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, businessOwner.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const business = await Business.findOne({ email })
    // console.log(`businessControllerTokenValues:\n _id:${business._id},\n role: ${businessOwner.role},\n owenerId: ${business.ownerId}` );
    
    // Generate JWT token
    const token = jwt.sign(
      { _id: business._id, role: businessOwner.role , owenerId: business.ownerId },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    // console.log('businessController:',token);
    
    res.cookie('token', token)
    res.status(200).json({ message: 'Login successful', token });

  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

//Business Logout
const logoutBusiness = async (req, res, next) => {
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  // const token = req.headers.authorization?.split(' ')[1];
  await blacklistTokenModel.create({ token })
  res.status(200).json({ msg: "Logged out" })
}
// Export all controllers
module.exports = {
  registerBusiness,
  getBusinessProfile,
  updateBusinessProfile,
  deleteBusinessAccount,
  loginBusiness,
  logoutBusiness
};
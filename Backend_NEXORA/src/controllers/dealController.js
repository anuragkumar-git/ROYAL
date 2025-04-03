const Deal = require('../models/dealModel');
const Business = require('../models/businessModel');
const jwt = require("jsonwebtoken")


//* Create a New Deal
// @desc Create a new deal
// @route POST /api/deals
// @access Private (Business Only)
const createDeal = async (req, res) => {
    try {

        const businessId = req.user._id
        // console.log(businessId);

        // Create a new deal using the request body
        const newDeal = new Deal({ ...req.body, businessId });

        await newDeal.save();
        res.status(201).json({ message: 'Deal created successfully', deal: newDeal });
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: `dealcontroller: ${error.message}` });
    }
};


//* Get All Deals
// @desc Get all active deals for the landing page
// @route GET /api/deals
// @access Public
const getAllDeals = async (req, res) => {
    try {
        // Pagination and sorting options
        const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;
        const sortOption = { [sortBy]: order === 'asc' ? 1 : -1 };

        // Find all active deals
        const deals = await Deal.find({ isActive: true }).populate('businessId', 'businessName email')
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalDeals = await Deal.countDocuments({ isActive: true });

        res.status(200).json({
            totalDeals,
            currentPage: Number(page),
            totalPages: Math.ceil(totalDeals / limit),
            deals,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ✅ Explanation of the Code
// Pagination → Supports pagination using page and limit query params. Example:
// GET /api/deals?page=2&limit=5
// Sorting → Allows sorting using sortBy and order (ascending or descending). 
// Example:
// GET /api/deals?sortBy=discountPercentage&order=asc
// Active Deals Only → Ensures only deals with isActive: true are fetched.
// Performance Optimization → Efficient use of .skip() and .limit() for large datasets.


//* Get Deal by ID
// @desc Get a single deal by ID
// @route GET /api/deals/:id
// @access Public (Users and Businesses)
const getDealById = async (req, res) => {
    try {
        const id = req;
        // console.log(id);


        //* Find deal by ID and ensure it's active
        // const deal = await Deal.findOne({ _id: id, isActive: true }); 

        const deal = await Deal.findById(req.params.dealId).populate('businessId', 'name email');

        if (!deal) {
            return res.status(404).json({ message: 'Deal not found.' });
        }

        res.status(200).json(deal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//* Get Deals of a Business
// @desc Get all deals for the authenticated business
// @route GET /api/deals/business
// @access Private (Business Only)
const getDealsForBusiness = async (req, res) => {
    try {
        // const businessId = req.user.id;
        const businessId = req.user.id;


        // const deals = await Deal.find({ businessId, isActive: true });
        // Pagination and sorting options
        const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;
        const sortOption = { [sortBy]: order === 'asc' ? 1 : -1 };

        // Find all active deals for this business
        const deals = await Deal.find({ businessId, isActive: true })
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const activeDeals = await Deal.countDocuments({ businessId, isActive: true });
        // const expiredDeals = await Deal.countDocuments({ businessId, isActive: false });

        res.status(200).json({
            activeDeals,
            currentPage: Number(page),
            totalPages: Math.ceil(activeDeals / limit),
            deals,
        });

        // res.status(200).json({ deals });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


//* Update a Deal
// @desc Update an existing deal
// @route PUT /api/deals/:id
// @access Private (Business Only)
const updateDeal = async (req, res) => {
    try {

        // Find deal by ID
        const deal = await Deal.findById(req.params.dealId);//id

        if (!deal) {
            return res.status(404).json({ message: 'Deal not found.' });
        }

        // Ensure only the business owner can update the deal
        // if (req.user.role !== 'business' || deal.businessId.toString() !== req.user.businessId) {
        if (deal.businessId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access Denied. Only the owner can update this deal.' });
        }

        // Update the deal with new data
        Object.assign(deal, req.body);
        await deal.save();

        res.status(200).json({ message: 'Deal updated successfully', deal });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//* Delete a Deal
// @desc Delete (soft delete) a deal
// @route DELETE /api/deals/:id
// @access Private (Business Only)
const deleteDeal = async (req, res) => {
    try {
        // const { id } = req.params;//use them
        // const businessId = req.user.id;
        // Find the deal
        const deal = await Deal.findById(req.params.dealId);

        if (!deal) {
            return res.status(404).json({ message: 'Deal not found.' });
        }

        // Ensure only the business owner can delete it
        // if (req.user.role !== 'business' || deal.businessId.toString() !== req.user._id) {
        if (deal.businessId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access Denied. Only the owner can delete this deal.' });
        }

        // Perform soft delete
        deal.isActive = false;
        await deal.save();

        // await Deal.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Deal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: `deal controller:${error.message}` });
    }
};

//* Delete deals of a Business
// @desc Get a single deal by ID
// @route DELETE /api/deals/
// @access Private (Businesses Only)
const deleteDeals = async (req, res) => {
    try {

        const totalDeals = await Deal.countDocuments({ businessId: req.user._id, isActive: true });
        if (totalDeals === 0) {
            return res.status(401).json({ message: 'No active deals found for this business.' });
        }



        // Perform soft delete
        await Deal.updateMany(
            { businessId: req.user._id, isActive: true },
            { $set: { isActive: false } }
        );

        res.status(200).json({ message: `${totalDeals} deal(s) deleted successfully.` });
    } catch (error) {
        res.status(500).json({ message: `deal controller:${error.message}` });
    }
};



module.exports = {
    createDeal,
    updateDeal,
    deleteDeal,
    deleteDeals,
    getDealById,
    getAllDeals,
    getDealsForBusiness,
};

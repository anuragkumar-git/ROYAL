const Deal = require('../models/dealModel');
const Business = require('../models/businessModel');
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');
const sendEmail = require('../utils/sendEmail');


//* Create a New Deal
// @desc Create a new deal
// @route POST /api/deals
// @access Private (Business Only)
const createDeal = async (req, res) => {
    try {

        const businessId = req.user._id
        const images = req.file ? req.files.map(file => file.path) : []; // Cloudinary URL
        const business = await Business.findById(businessId)
        if (!business || !business.location) {
            return res.status(400).json({ message: 'Business location not found.' })
        }
        console.log('✔️ createDeal(19): Adress fatched successfully');

        // Create a new deal using the request body
        const deal = new Deal({ ...req.body, images, businessId, location: business.location });

        await deal.save();
        res.status(201).json({ message: 'Deal created successfully', deal });
        console.log('✔️ createDeal: Deal created successfully');
    } catch (error) {
        console.log('❗cretedeal:', error);

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
        const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc', lat, long, maxDistance, category } = req.query;
        // const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;
        const sortOption = { [sortBy]: order === 'asc' ? 1 : -1 };
        // let query = { dealStatus: 'active', verified: true };
        let query = { isActive: true }
        if (category) query.category = category
        if (lat && long) {
            query.location = {
                $near: {
                    $geometry: { type: 'Point', coordinates: [Number(long), Number(lat)] },
                    $maxDistance: Number(maxDistance) || 5000,
                },
            }
        }
        // Find all active deals
        const deals = await Deal.find({ isActive: true }).populate('businessId', 'businessName email')
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .lean();
        console.log('getAllDeals(62): deals not found');
        const totalDeals = await Deal.countDocuments(query);
        console.log('getAllDeals(64): TOTAL DEALS');

        res.status(200).json({
            totalDeals,
            currentPage: Number(page),
            totalPages: Math.ceil(totalDeals / limit),
            deals,
        });
    } catch (error) {
        console.error('getAllDeals:', error);
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

//Get Featured Deals 
const getFeaturedDeals = async (req, res) => {
    try {
        const deals = await Deal.find({ isFeatured: true, isActive: true }).populate('businessId', 'businessName').lean();
        console.log('getFeaturedDeals(90) ')
        res.status(200).json(deals);
    } catch (error) {
        console.error('getFeaturedDeals: ', error)
        res.status(500).json({ message: error.message })
    }
}
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

        const deal = await Deal.findById(req.params.dealId).populate('businessId', 'businessName email');
        console.log('getDealById: deal found');

        // if (!deal || !deal.isActive || !deal.verified) {
        if (!deal || !deal.isActive) {
            console.log('getDealById(114): deal not found', !deal,);
            return res.status(404).json({ message: 'Deal not found.' });
        }
        deal.views += 1
        await deal.save()
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
        const businessId = req.user._id;

        // console.log('businessIDController',businessId);

        // const deals = await Deal.find({ businessId, isActive: true });
        // Pagination and sorting options
        const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;
        const sortOption = { [sortBy]: order === 'asc' ? 1 : -1 };

        // Find all active deals for this business
        const deals = await Deal.find({ businessId, isActive: true })
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(Number(limit)).populate('businessId')
            .lean();
        // console.log('deals', deals);

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
        console.error('getDealsForBusiness:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


// Get Nearby Deals (Mapbox)
const getNearbyDeals = async (req, res) => {
    try {
        const { longitude, latitude, maxDistance = 5000 } = req.query; // meters

        // Find nearby businesses with active deals
        // Query: Finds Deal documents near a point
        const deals = await Deal.find({
            // dealStatus: 'active',
            // verified: true,
            isActive: true
        })
            .populate({
                path: 'businessId',
                match: {
                    location: {
                        $near: {
                            $geometry: { type: 'Point', coordinates: [parseFloat(longitude), parseFloat(latitude)] },
                            $maxDistance: parseInt(maxDistance),
                        },
                    },
                },
            })
            .lean();

        // Filter out deals with null businessId
        const filteredDeals = deals.filter(deal => deal.businessId);

        res.status(200).json({ success: true, data: filteredDeals });
    } catch (error) {
        console.error('getNearbyDeals:', error);
        res.status(500).json({ success: false, message: 'Error fetching nearby deals', error: error.message });
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
        console.error('updateDeal:', error);
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
        console.error('deleteDeal:', error);
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
        console.error('deleteDeals:', error);
        res.status(500).json({ message: `deal controller:${error.message}` });
    }
};


//Save a Deal
const saveDeal = async (req, res) => {
    try {
        const deal = await Deal.findById(req, params.dealId)
        // if(!deal || !deal.isActive || !deal.verified){
        if (!deal || !deal.isActive) {
            return res.status(404).json({ message: 'Deal not found.' })
        }
        deal.saves += 1
        const user = await User.findById(req.user._id)
        if (!user.savedDeals.some(d => d.dealId.equals(deal._id))) {
            user.savedDeals.push({ dealId: deal._id })
            await user.save()
        }
        await deal.save()
        res.status(200).json({ message: 'Deal saved.' })
    } catch (error) {
        console.error('saveDeal: ', error)
        res.status(500).json({ message: error.message })
    }
}

//Redeem a Deal
const redeemDeal = async (req, res) => {
    try {
        const { code } = req.body
        //# Other parameter to find deal also changes in logc maybe parameters
        // if (!code.match(/^[A-Z0-9]{8,12}$/)) {
        //     return res.status(400).json({ message: 'Invalid code format.' });
        //   }

        //flow: click on deal -> dealdetail page, claim deal -> Redemption code 
        const deal = await Deal.findOne({ redemptionCode: code })
        // if (!deal || !deal.isActive || !deal.verified ){
        if (!deal || !deal.isActive) {
            return res.status(404).json({ message: 'Invalid or expired Deal' })
        }
        if (deal.maxRedemptions && deal.redemptionCount >= deal.maxRedemptions) {
            return res.status(400).json({ message: 'Redemption limit reaxhed.' })
        }
        if (deal.endDate < new Date()) {
            return res.status(400).json({ message: 'Deal expired.' })
        }
        deal.redemptionCount += 1
        const user = await User.findById(req.user._id);
        if (!user.redeemedDeals.some(d => d.dealId.equals(deal._id))) {
            user.redeemedDeals.push({ dealId: deal._id, redemptionCode: code })
            await user.save()
        }
        await user.save()
        res.status(200).json({ message: 'Deal redeemed successfully.' })
    } catch (error) {
        console.error('redeemDeal: ', error.message, error)
        res.status(500).json({ message: error.message })
    }
}


module.exports = {
    createDeal,
    updateDeal,
    deleteDeal,
    deleteDeals,
    getDealById,
    getAllDeals,
    getNearbyDeals,
    getDealsForBusiness,
    getFeaturedDeals,
    redeemDeal,
    saveDeal,
};

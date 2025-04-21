const express = require('express');

const { validateDealData } = require('../middlewares/validateDealData');
const { authenticateUser, authorizeRole } = require('../middlewares/authMiddleware')
const upload = require('../middlewares/uploadMiddleware');
const { default: rateLimit } = require('express-rate-limit');

const { createDeal, updateDeal, deleteDeal, deleteDeals, getDealById, getDealsForBusiness, getAllDeals, getFeaturedDeals, saveDeal, redeemDeal } = require('../controllers/dealController');

const router = express.Router();

// Rate limit public routes
const publicRateLimit = rateLimit({ windowMs: 60 * 60 * 1000, max: 100 })


//? Public Route - Get all active deals for the landing page
router.get('/', publicRateLimit, getAllDeals);
router.get('/featured', publicRateLimit, getFeaturedDeals)
router.get('/:dealId', publicRateLimit, getDealById)


//? Protected Routes for Users
router.post('/:dealId/save', authenticateUser, authorizeRole(['user']), saveDeal)
router.post('/:dealId/redeem', authenticateUser, authorizeRole(['user']), redeemDeal)


//? Protected Routes for Business Owners
//Create deal route
router.post('/', authenticateUser, authorizeRole(['business']), upload.single('images'), validateDealData, createDeal);

//update deal route
router.put('/:dealId', authenticateUser, authorizeRole(['business']), updateDeal);

//Delete deal Route
router.delete(
    '/:dealId',
    authenticateUser,
    authorizeRole(['business']),
    deleteDeal
);

router.delete(
    '/',
    authenticateUser,
    authorizeRole(['business']),
    deleteDeals
);

// Fetch Deals for Business Dashboard
router.get(
    '/business',
    authenticateUser,
    authorizeRole(['business']),
    getDealsForBusiness
);


module.exports = router;

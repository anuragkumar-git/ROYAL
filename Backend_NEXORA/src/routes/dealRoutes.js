const express = require('express');

const { validateDealData } = require('../middlewares/validateDealData');
const {authenticateUser, authorizeRole } = require('../middlewares/authMiddleware')
const upload = require('../middlewares/uploadMiddleware');

const { createDeal, updateDeal, deleteDeal, deleteDeals, getDealById, getDealsForBusiness, getAllDeals } = require('../controllers/dealController');

const router = express.Router();

// Public Route - Get all active deals for the landing page
router.get('/', getAllDeals);


//? Protected Routes for Business Owners
//Create deal route
router.post('/', authenticateUser, authorizeRole(['business']), upload.single('images'), validateDealData, createDeal);

//update deal route
// router.put('/:dealId', authenticateUser, authorizeRole(['business']), validateDealData, updateDeal);
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

// Fetch a Single Deal by ID (Public or Business)
router.get('/:dealId', getDealById);


module.exports = router;

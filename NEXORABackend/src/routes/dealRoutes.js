const express = require('express');

const { validateDealData } = require('../middlewares/validateDealData');
const { authenticateToken } = require('../middlewares/authenticateToken')
const { authorizeRole } = require('../middlewares/authorizeRole')

const { createDeal, updateDeal, deleteDeal, deleteDeals, getDealById, getDealsForBusiness, getAllDeals } = require('../controllers/dealController');

const router = express.Router();

// Public Route - Get all active deals for the landing page
router.get('/api/', getAllDeals);


//? Protected Routes for Business Owners
//Create deal route
router.post('/api/', authenticateToken, authorizeRole(['business']), validateDealData, createDeal);
//update deal route
// router.put('/api/:dealId', authenticateToken, authorizeRole(['business']), validateDealData, updateDeal);
router.put('/api/:dealId', authenticateToken, authorizeRole(['business']), updateDeal);
//Delete deal Route
router.delete(
    '/api/:dealId',
    authenticateToken,
    authorizeRole(['business']),
    deleteDeal
);

router.delete(
    '/api/',
    authenticateToken,
    authorizeRole(['business']),
    deleteDeals
);

// Fetch Deals for Business Dashboard
router.get(
    '/api/business',
    authenticateToken,
    authorizeRole(['business']),
    getDealsForBusiness
);

// Fetch a Single Deal by ID (Public or Business)
router.get('/api/:dealId', getDealById);


module.exports = router;

const express = require('express');
const router = express.Router();
const { reportDeal, getAllReportedDeals, deleteReportedDeal } = require('../controllers/reportedDealController');
const { authenticateUser, authorizeRole } = require('../middlewares/authMiddleware');

// ✅ Report a deal (Only Authenticated Users)
router.post('/', authenticateUser, reportDeal);

// ✅ Get all reported deals (Only Admin)
router.get('/', authenticateUser, authorizeRole(['admin']), getAllReportedDeals);

// ✅ Delete a reported deal (Only Admin)
router.delete('/:id', authenticateUser, authorizeRole(['admin']), deleteReportedDeal);

module.exports = router;
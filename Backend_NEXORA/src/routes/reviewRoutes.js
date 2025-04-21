const express = require('express');
const {
  addReview,
  updateReview,
  deleteReview,
  getDealReviews,
  getBusinessReviews,
  toggleReviewVisibility
} = require('../controllers/reviewController');

const {authenticateUser, authorizeRole} = require('../middlewares/authMiddleware');
const rateLimit = require('express-rate-limit');
const router = express.Router();

// Rate limiting
const reviewLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

/**
 // 1. Add a Review (Users only)
 * @route POST /api/reviews
 * @desc Create a review for a deal
 * @access Protected (user)
 */
router.post(
  '/',
  authenticateUser,
  authorizeRole(['user']),
  addReview
);

// ----------------------------
// 2. Update a Review (Users only)
// ----------------------------
router.put(
  '/:reviewId',
  authenticateUser,
  authorizeRole(['user']),
  updateReview
);

// ----------------------------
// 3. Delete a Review (Users only)
// ----------------------------
router.delete(
  '/:reviewId',
  authenticateUser,
  authorizeRole(['user']),
  deleteReview
);

/**
// 4. Get All Reviews for a Deal (Public)
 * @route GET /api/reviews/:dealId
 * @desc Get reviews for a deal
 * @access Public
 */
router.get(
  '/deal/:dealId',
  getDealReviews
);

// ----------------------------
// 5. Get All Business Reviews (Business Owners only)
// ----------------------------
router.get(
  '/business',
  authenticateUser,
  authorizeRole(['business']),
  getBusinessReviews
);

// ----------------------------
// 6. Hide or Display a Review (Business Owners only)
// ----------------------------
router.patch(
  '/visibility/:reviewId',
  authenticateUser,
  authorizeRole(['business']),
  toggleReviewVisibility
);
module.exports = router;

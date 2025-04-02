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

const router = express.Router();

// ----------------------------
// 1. Add a Review (Users only)
// ----------------------------
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

// ----------------------------
// 4. Get All Reviews for a Deal (Public)
// ----------------------------
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

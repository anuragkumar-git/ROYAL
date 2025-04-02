const Review = require('../models/reviewModel');
const Deal = require('../models/dealModel');
const mongoose = require('mongoose');
const User = require('../models/userModel');

// ----------------------------
// 1. Add a Review
// @desc Add a review of Deal
// @route GET /api/review/
// @access Private (Users)
// ----------------------------
const addReview = async (req, res) => {
  try {
    const { dealId, rating, comment } = req.body;


    // Validate deal existence
    const deal = await Deal.findById(dealId);

    if (!deal || !deal.isActive) {
      return res.status(404).json({ message: 'Deal not found or inactive' });
    }

    // Check if user already reviewed the deal
    const existingReview = await Review.findOne({ dealId, userId: req.user._id });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this deal' });
    }

    // Create new review
    const newReview = new Review({
      dealId,
      userId: req.user._id,
      rating,
      comment,
    });

    await newReview.save();

    const result = await User.updateOne(
      { _id: req.user._id },
      { $addToSet: { reviewHistory: newReview._id } }
    );

    if (result.modifiedCount === 0) {
      // console.log("Review not found or already removed.");
      return res.status(500).json({ message: "No matching review to remove" });
    }
    res.status(201).json({ message: 'Review added successfully', review: newReview });

  } catch (error) {
    res.status(500).json({ message: `Error adding review: ${error.message}` });
  }
};

// ----------------------------
// 2. Update a Review
// ----------------------------
const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(reviewId);

    // Check if review exists and belongs to the user
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only edit your own review' });
    }

    // Update the review
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    await review.save();

    res.status(200).json({ message: 'Review updated successfully', review });
  } catch (error) {
    res.status(500).json({ message: `Error updating review: ${error.message}` });
  }
};

// ----------------------------
// 3. Delete a Review
// ----------------------------
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    // Check if review exists and belongs to the user
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own review' });
    }

    //! await Review.findByIdAndDelete(reviewId);
    // Perform soft delete
    review.isVisible = false;
    await review.save();

    const result = await User.updateOne(
      { _id: req.user._id },
      //userModel.reviewHistory:[mongoose.Schema.Types.ObjectId]
      { $pull: { reviewHistory: reviewId } }
      //userModel.reviewHistory:[ {type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
      //{ $pull: { "reviewHistory": { reviewId: new mongoose.Types.ObjectId(reviewId) } } }
    );

    // console.log(result);

    if (result.modifiedCount === 0) {
      // console.log("Review not found or already removed.");
      return res.status(500).json({ message: "No matching review to remove" });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: `Error deleting review: ${error.message}` });
  }
};

// ----------------------------
// 4. Get All Reviews for a Deal
// ----------------------------
const getDealReviews = async (req, res) => {
  try {
    const { dealId } = req.params;

    const reviews = await Review.find({ dealId })
      .populate('userId', 'name')
      .sort({ createdAt: -1 }); // Latest reviews first

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this deal' });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: `Error fetching reviews: ${error.message}` });
  }
};

// ----------------------------
// 5. Get Business Reviews
// ----------------------------
const getBusinessReviews = async (req, res) => {
  try {
    const businessId = req.user._id;

    // Find all deals of the business
    const deals = await Deal.find({ businessId }).select('_id');

    const dealIds = deals.map((deal) => deal._id);

    // Fetch reviews related to those deals
    const reviews = await Review.find({ dealId: { $in: dealIds } })
      .populate('userId', 'name')
      .populate('dealId', 'title');

    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found for your deals' });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: `Error fetching business reviews: ${error.message}` });
  }
};

// ----------------------------
// 6. Hide or Display a Review(busines)
// ----------------------------
// Toggle the visibility of a review
const toggleReviewVisibility = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const businessId = req.user._id; // Extract from the token using authenticateUser

    // Find the review
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    // Find the associated deal
    const deal = await Deal.findById(review.dealId);
    if (!deal) {
      return res.status(404).json({ message: 'Associated deal not found.' });
    }

    // Ensure the business is authorized (owns the deal)
    if (deal.businessId.toString() !== businessId.toString()) {
      return res.status(403).json({ message: 'Unauthorized. You can only manage reviews for your own deals.' });
    }

    // Toggle the visibility
    review.isVisible = !review.isVisible;
    await review.save();

    res.status(200).json({ message: `Review visibility updated. Now visible: ${review.isVisible}` });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};
module.exports = {
  addReview,
  updateReview,
  deleteReview,
  getDealReviews,
  getBusinessReviews,
  toggleReviewVisibility
};

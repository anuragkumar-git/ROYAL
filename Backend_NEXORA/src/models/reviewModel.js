const mongoose = require('mongoose');

// Define the review schema
const reviewSchema = new mongoose.Schema({
  dealId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deal',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    trim: true,
    maxLength: 500,
    default: '',
  },
  isVisible: {
    type: Boolean,
    default: true, // Reviews can be hidden by admin
  },
},
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  });

// Ensure a user can only review a deal once
reviewSchema.index({ dealId: 1, userId: 1, businessId: 1, isVisible: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

const mongoose = require('mongoose');

const adminActivitySchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming Admin is a role in the Users collection
    required: true,
  },
  activityType: {
    type: String,
    enum: ['approveBusiness', 'rejectDeal', 'banUser', 'unbanUser', 'deleteReview'],
    required: true,
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for efficient querying of admin activities
adminActivitySchema.index({ adminId: 1, createdAt: -1 });

const AdminActivity = mongoose.model('AdminActivity', adminActivitySchema);

module.exports = AdminActivity;

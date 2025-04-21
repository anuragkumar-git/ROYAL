const mongoose = require('mongoose');

const resetTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

// Indexes for performance and TTL
// resetTokenSchema.index({ token: 1 }, { unique: true });
resetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });// Auto delete after expiry

const ResetToken = mongoose.model('ResetToken', resetTokenSchema);
module.exports = ResetToken;

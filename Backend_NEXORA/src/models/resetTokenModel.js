const mongoose = require('mongoose');

const resetTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

resetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Auto delete after expiry

const ResetToken = mongoose.model('ResetToken', resetTokenSchema);
module.exports = ResetToken;

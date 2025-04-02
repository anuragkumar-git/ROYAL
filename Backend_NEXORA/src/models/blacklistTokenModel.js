// src/models/tokenBlacklistModel.js

const mongoose = require('mongoose');

const tokenBlacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // Automatically delete after 24 hours (MongoDB TTL feature)
  }
});

// Optional: Indexing for automatic deletion of expired tokens (using TTL Index)
tokenBlacklistSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const blacklistTokenModel = mongoose.model('TokenBlacklist', tokenBlacklistSchema);
 
module.exports = blacklistTokenModel;

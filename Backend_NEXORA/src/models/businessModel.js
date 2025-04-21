const mongoose = require('mongoose')

const businessSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  businessName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  businessType: {
    type: String,
    required: true,
    // enum: ['Restaurant', 'Cafe', 'Hotel', 'Shop', 'Wellness & Yoga','Printing & Publishing','Other'],
  },
  registrationNumber: {
    type: String,
    //? required: true, //Auto generate
    //? unique: true,
  },
  website: {
    type: String,
    trim: true,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  verified: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['business'],
    default: 'business',
  },
}, { timestamps: true });

// Virtual field to count active deals
// Counts Deal documents where businessId matches this Business._id, dealStatus: 'active', and verified: true
businessSchema.virtual('activeDeals', {
  ref: 'Deal',                    // References Deal model
  localField: '_id',             // Matches Business._id
  foreignField: 'businessId',    // Matches Deal.businessId
  count: true,                   // Returns count of matching Deals
  // match: { dealStatus: 'active', verified: true } // Only counts active, verified deals
  match: { isActive: true } // Only counts active, verified deals
});

// Ensure virtuals are included in toJSON and toObject
businessSchema.set('toJSON', { virtuals: true });
businessSchema.set('toObject', { virtuals: true });

// Indexes for performance
// businessSchema.index({ email: 1 }, { unique: true });
// businessSchema.index({ registrationNumber: 1 }, { unique: true });
businessSchema.index({ location: '2dsphere' });
businessSchema.index({ ownerId: 1 });
businessSchema.index({ isBlocked: 1 });

// // Pre-save hook to update `updatedAt`
// businessSchema.pre('save', function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// Sync verified with status
businessSchema.pre('save', function (next) {
  if (this.status === 'approved') this.verified = true;
  if (this.status === 'rejected' || this.status === 'pending') this.verified = false;
  next();
});


const Business = mongoose.model('Business', businessSchema);
module.exports = Business;

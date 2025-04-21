const mongoose = require('mongoose')
const crypto = require('crypto');
const { title } = require('process');
const { log } = require('console');

const dealSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    // required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ['Food', 'Beauty', 'Retail', 'Fitness', 'Services', 'Entertainment', 'other'],
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  originalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  discountedPrice: {
    type: Number,
    min: 0,
  },
  redemptionCode: {
    type: String,
    uniqe: true
  },
  redemptionCount: {
    type: Number,
    default: 0,
    min: 0
  },
  maxRedemptions: {
    type: Number,
    min: 0
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  // dealStatus: {
  //   type: String,
  //   enum: ['active', 'expired', 'pending', 'rejected'],
  //   default: 'pending',
  // },
  // verified: {
  //   type: Boolean,
  //   default: false
  // },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  dealType: {
    type: String,
    enum: ['flash', 'regular', 'featured', 'festival', 'stockClearance', 'other'],
    default: 'regular',
    required: true,
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  saves: {
    type: Number,
    default: 0,
    min: 0
  },
  emailSent: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: [String],
    default: [],
  },
  images: {
    type: [String],
    default: [],
  },
  termsAndConditions: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isReported: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true
});

//Indexes
dealSchema.index({ lacation: '2dsphere' });
dealSchema.index({ businessId: 1, isActive: 1 });
dealSchema.index({ title: 'text', description: 'text', tags: 1 });
dealSchema.index({ endDate: 1 })

dealSchema.pre('save', function (next) {
  // Calculate discountedPrice based on originalPrice and discountPercentage
  this.discountedPrice = this.originalPrice - (this.originalPrice * (this.discountPercentage / 100));

  //Generate redemptionCode
  if (!this.redemptionCode) {
    this.redemption = `NEXORA-${crypto.randomBytes(4).toString('hex')}`.toUpperCase();
    this.redemptionCode = this.redemption.toString('hex').toUpperCase();

    console.log('dealmodel', redemption);
    console.log('dealmodel', redemptionCode);
  }

  // // Validate dates
  // if (this.endDate <= this.startDate) {
  //   return next(new Error('endDate must be after startDate'));
  // }

  // // Validate discountedPrice
  // const expectedDiscountedPrice = this.originalPrice - (this.originalPrice * (this.discountPercentage / 100));
  // if (this.discountedPrice && Math.abs(this.discountedPrice - expectedDiscountedPrice) > 0.01) {
  //   return next(new Error('discountedPrice does not match calculation'));
  // }

  next();
});

dealSchema.pre('find', function (next) {
  this.where({ isActive: true, })
  next()
})
const Deal = mongoose.model('Deal', dealSchema);

module.exports = Deal;

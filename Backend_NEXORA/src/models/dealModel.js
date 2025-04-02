const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// const dealSchema = new Schema({
//     dealDesc:{
//         type:String
//     },
//     dealType:{
//         type:String,
//         enum:['flash','Standing', 'General', 'Seasonal']
//     },
//     startDate:{
//         type:Date
//     },
//     endDate:{
//         type:Date
//     },
//     coditions:{
//         type:String
//     }
// })  


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
  dealStatus: {
    type: String,
    enum: ['active', 'expired', 'pending', 'rejected'],
    default: 'pending',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  dealType:{
    type: String,
    enum: ['flash', 'regular', 'featured', 'festival', 'stockClearance'],
    default: 'regular',
    required: true,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

// Calculate discountedPrice based on originalPrice and discountPercentage
dealSchema.pre('save', function (next) {
  this.discountedPrice = this.originalPrice - (this.originalPrice * (this.discountPercentage / 100));
  this.updatedAt = Date.now();
  next();
});

const Deal = mongoose.model('Deal', dealSchema);

module.exports = Deal;

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
    required: true,
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
    required: true,
    min: 0,
  },
  dealStatus: {
    type: String,
    enum: ['active', 'expired', 'pending', 'rejected'],
    default: 'pending',
  },
  expiryDate: {
    type: Date,
    required: true,
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
});

// Calculate discountedPrice based on originalPrice and discountPercentage
dealSchema.pre('save', function (next) {
  this.discountedPrice = this.originalPrice - (this.originalPrice * (this.discountPercentage / 100));
  this.updatedAt = Date.now();
  next();
});

const Deal = mongoose.model('Deal', dealSchema);

module.exports = Deal;

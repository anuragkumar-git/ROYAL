const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// const userSignUpSchema = new Schema({
//     name: {
//         type: String
//     },
//     email: {
//         type: String,
//         unique: true
//     },
//     password: {
//         type: String
//     },
//     role: {
//         id: {
//             type: Schema.Types.ObjectId,
//             ref: "roles"
//         },
//         desc: {
//             type: String
//         }
//     }
// })
// const userSignUpModel = mongoose.model("userSignUp", userSignUpSchema)
// module.exports = userSignUpModel 
// module.exports = mongoose.model("userSignUps", userSignUpSchema)



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true //Allow this field to be optional for non-google users
  },
  avatar: {
    type: String,
    default: 'https://cdn-icons-png.flaticon.com/512/10337/10337609.png', // URL or path to avatar image
  },
  role: {
    type: String,
    enum: ['user', 'business', 'admin'],
    default: 'user',
    required: true,
  },
  preferences: {
    notifications: {
      type: Boolean,
      default: true,
    },
    locationTracking: {
      type: Boolean,
      default: true,
    },
  },
  savedDeals: [
    {
      dealId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deal',
      },
      savedAt: {
        type: Date,
        default: Date.now,
      },
      notifyExpiry: {
        type: Boolean, default: true
      },
    },
  ],
  redeemedDeals: [
    {
      dealId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deal'
      },
      redemptionCode: {
        type: String,
        // required: true
      },
      redeemedAt: { type: Date, default: Date.now }
    }
  ],
  reviewHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }
  ],
  isBlocked: {
    type: Boolean,
    default: false,
  },
  notifyExpiry: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Virtual for saved deal count
userSchema.virtual('savedDealCount', {
  ref: 'Deal',
  localField: 'savedDeals.dealId',
  foreignField: '_id',
  count: true,
});

// Virtual for redeemed deal count
userSchema.virtual('redeemedDealCount', {
  ref: 'Deal',
  localField: 'redeemedDeals.dealId',
  foreignField: '_id',
  count: true,
});

// Ensure virtuals are included in JSON
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

//Indexes
// userSchema.index({ gmail: 1 }, { unique: true });
// userSchema.index({ googleId: 1 }, { unique: true, sparse: true });
userSchema.index({ 'savedDeals.dealId': 1 })
userSchema.index({ 'redeemedDeals.dealId': 1 });
userSchema.index({ role: 1 });
userSchema.index({ isBlocked: 1 });

// Validate savedDeals and redeemedDeals
userSchema.pre('save', function (next) {
  if (this.savedDeals.some(d => !mongoose.Types.ObjectId.isValid(d.dealId))) {
    throw new Error('Invalid dealId in savedDeals');
  }
  if (this.redeemedDeals.some(d => !mongoose.Types.ObjectId.isValid(d.dealId))) {
    throw new Error('Invalid dealId in redeemedDeals');
  }
  next();
});
// // Pre-save hook to update `updatedAt`
// userSchema.pre('save', function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// //Dedupe reviewHistory
// userSchema.pre('save', function (next) {
//   if (this.reviewHistory.length) {
//     this.reviewHistory = [...new Set(this.reviewHistory.map(String))]
//   }
//   next()
// })
const User = mongoose.model('User', userSchema);
module.exports = User;
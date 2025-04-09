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
    // default: 'https://cdn-icons-png.flaticon.com/512/10337/10337609.png', // URL or path to avatar image
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
    },
  ],
  reviewHistory: [
    mongoose.Schema.Types.ObjectId
  ],
  isBlocked: {
    type: Boolean,
    default: false,
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

// Pre-save hook to update `updatedAt`
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;



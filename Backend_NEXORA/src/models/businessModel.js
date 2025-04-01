const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// const bussinessRegistraionSchema = new Schema({

//     businessInformation: {
//         name: {
//             type: String
//         },
//         contact: {
//             type: Number
//         },
//     },
//     ownerDetails: {
//         name: {
//             type: String
//         },
//         email: {
//             type: String
//         },
//         contact: {
//             type: Number
//         }
//     },
//     businessAddress: {
//         address: {
//             type: String
//         },
//         location: {
//             lat: Number,
//             lng: Number
//         }
//     }, oprationalDetails: {
//         menuType: String,
//         operationalHours: String
//     }, role: {
//         id: {
//             type: Schema.Types.ObjectId,
//             ref: "roles"
//         },
//         desc: {
//             type: String
//         }
//     }
// })
// module.exports = mongoose.model("bussinesses", bussinessRegistraionSchema)


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
  businessType: {
    type: String,
    required: true,
    enum: ['Restaurant', 'Cafe', 'Hotel', 'Shop', 'Other'],
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
businessSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Generate JWT for authentication
// businessSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id, role:this.role }, process.env.JWT_SECRET, { expiresIn: '24h' })
//   console.log("businessModel:",token);
  
//   return token
// }

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bussinessRegistraionSchema = new Schema({

    businessInformation: {
        name: {
            type: String
        },
        contact: {
            type: Number
        },
    },
    ownerDetails: {
        name: {
            type: String
        },
        email: {
            type: String
        },
        contact: {
            type: Number
        }
    },
    businessAddress: {
        address: {
            type: String
        },
        location: {
            lat: Number,
            lng: Number
        }
    }, oprationalDetails: {
        menuType: String,
        operationalHours: String
    }, role: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "roles"
        },
        desc: {
            type: String
        }
    }
})

module.exports = mongoose.model("bussinesses", bussinessRegistraionSchema)
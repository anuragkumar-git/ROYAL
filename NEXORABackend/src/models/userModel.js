const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSignUpSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "roles"
        },
        desc: {
            type: String
        }
    }
})

// const userSignUpModel = mongoose.model("userSignUp", userSignUpSchema)
// module.exports = userSignUpModel 

module.exports = mongoose.model("userSignUps", userSignUpSchema)
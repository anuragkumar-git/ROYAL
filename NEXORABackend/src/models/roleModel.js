const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roleSchema = new Schema({
    role: {
        type: String,
        unique: true
    }
})

module.exports = mongoose.model("roles", roleSchema)
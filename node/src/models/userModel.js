const { default: mongoose} = require("mongoose");

const Schema = mongoose.Schema 

const userSchmema = new Schema({
    fName:{type:String},
    lName:{type:String},
    age:{type:Number},
    status:{type:Boolean}
})

const userModel = mongoose.model('user', userSchmema)
module.exports = userModel
const mongoose = require('mongoose')
// const Schema = mongoose.Schema()

const reportedDealSchema = new mongoose.Schema({
    dealId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deal',
        required: true
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ReportedDeal = mongoose.model('ReportedDeal', reportedDealSchema);
module.exports = ReportedDeal;
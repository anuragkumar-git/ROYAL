const cron = require('node-cron');
const Deal = require('../models/dealModel');
const User = require('../models/userModel');
const sendEmail = require('./sendEmail');

//Send Expiry Reminders 
const sendExpiryReminders = async () => {
    try {
        const deals = await Deal.find({
            endDate: { $lte: new Date(Date.now() + 48 * 60 * 60 * 1000) },
            emailSent: false,
            isActive: true,
            // verified: true,
        }).populate('businessId', 'businessName');
        console.log('sendExpiryReminders: ',deals);
        

        for (const deal of deals) {
            const users = await User.find({
                'savedDeals.dealId': deal._id,
                'savedDeals.notifyExpiry': true,
                'preferences.notifications': true,
            }).select('email name');
            for (const user of users) {
                await sendEmail(
                    user.email,
                    `NEXORA: Your Deal "${deal.title}" Expires Soon!`,
                    `Hi ${user.name}, \n\nYour saved deal "${deal.title}" at ${deal.businessId.businessName} expires on ${deal.endDate.toDateString()}. \nRedeem it now: http://localhost:5173/deals/${deal._id}\n\nNEXORA Team`
                )
            }
            deal.emailSent = true
            await deal.save()
        }
    } catch (error) {
        console.error('sendExpiryReminders:', error);
    }
}

module.exports = {
    scheduleJobs: () => {
        // cron.schedule('* * * * *', sendExpiryReminders); // Every minute for testing
        cron.schedule('30 2 * * *', sendExpiryReminders)
    }
}
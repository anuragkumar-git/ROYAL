const User = require('../models/userModel')

const handleGoogleAuth = async (profile) => {
    const existingUser = await User.findOne({ googleId: profile.id })

    if (existingUser) return existingUser

    const newUser = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value || 'https://cdn-icons-png.flaticon.com/512/10337/10337609.png',
        googleId: profile.id
    })

    return newUser
}

module.exports = { handleGoogleAuth }
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { handleGoogleAuth } = require('../src/utils/googleAuthHandler');
const User = require('../src/models/userModel');

// Serialize user for session
passport.serializeUser((user, done) => done(null, user._id));

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Google OAuth strategy
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
        scope: ['profile', 'email'],
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await handleGoogleAuth(profile);
                done(null, user);
            } catch (err) {

                // console.log('GoogleStrategy:', err);
                if (err.code === 11000 && err.keyValue?.email) {
                    const error = new Error(`Email ${err.keyValue.email} already exists`);
                    return done(error, null);
                }
                done(err, null);
            }
        }
    )
);

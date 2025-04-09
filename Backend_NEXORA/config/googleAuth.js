const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { handleGoogleAuth } = require('../src/utils/googleAuthHandler')

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await handleGoogleAuth(profile);
                done(null, user);
            } catch (err) {

                // console.log('googleAuth.js', err);
                if (err.code === 11000 && err.keyValue?.email) {
                    const error = new Error(`Email ${err.keyValue.email} already exists`);
                    return done(error, null);
                  }
                done(err, null);
            }
        }
    )
);

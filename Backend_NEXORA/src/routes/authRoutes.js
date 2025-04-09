const router = require('express').Router()
const passport = require('passport');
const { signIn, signOut, forgetPassword, resetPassword, googleCallbackController } = require('../controllers/authController')
const { authenticateUser } = require('../middlewares/authMiddleware')

router.post('/login', signIn);
router.post('/logout', authenticateUser, signOut);
router.post('/forgetpassword', forgetPassword)
router.post('/resetpassword/:token', resetPassword)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback', passport.authenticate('google', { session: false }), googleCallbackController)

module.exports = router
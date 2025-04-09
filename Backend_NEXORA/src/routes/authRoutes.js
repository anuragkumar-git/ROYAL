const router = require('express').Router()
const { signIn, signOut, forgetPassword, resetPassword } = require('../controllers/authController')
const {authenticateUser }=require('../middlewares/authMiddleware')

router.post('/login', signIn);
router.post('/logout', authenticateUser,signOut);
router.post('/forgetpassword', forgetPassword)
router.post('/resetpassword/:token', resetPassword)

module.exports = router
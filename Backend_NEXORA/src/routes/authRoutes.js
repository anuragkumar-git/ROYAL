const router = require('express').Router()
const { signIn, signOut } = require('../controllers/authController')
const {authenticateUser }=require('../middlewares/authMiddleware')

router.post('/login', signIn);
router.post('/logout', authenticateUser,signOut);

module.exports = router
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const Business = require('../models/businessModel')
const { generateToken, blackListToken } = require('../utils/tokenUtils')

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user or business exists
        let account = await User.findOne({ email })

        if (!account) {
            return res.status(401).json({
                message: 'Invalid credentials'
            })
        }

        //compare passwords
        const isPasswordValid = await bcrypt.compare(password, account.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        //generate TOken
        const token = await generateToken(account)

        //Set token in cookie
        res.cookie('token', token)

        res.status(200).json({ message: 'Login successful', token, role: account })
    } catch (error) {
        res.status(500).json({ message: `Error logging in: ${error.message}` });
    }
}

const signOut = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }

        res.clearCookie('token')
        await blackListToken(token)

        res.status(200).json({ message: "Logout successful" })
    } catch (error) {
        res.status(500).json({ message: `Error logging out: ${error.message}` });
    }
}

module.exports = { signIn, signOut }
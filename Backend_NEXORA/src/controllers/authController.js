const bcrypt = require('bcrypt')
const crypto = require('crypto')
const User = require('../models/userModel')
const Business = require('../models/businessModel')
const ResetToken = require('../models/resetTokenModel')
const { generateToken, blackListToken } = require('../utils/tokenUtils')
const sendEmail = require('../utils/sendEmail')

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
        if (!token) return res.status(500).json({ message: 'Token generation failed' });

        //Set token in cookie
        res.cookie('token', token, {
            // httpsOnly: true,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.status(200).json({ message: 'Login successful', id: user._id, role: user.role });
    } catch (error) {
        console.error('signIn:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
}

const signOut = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }

        await blackListToken(token);

        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('signOut:', error);
        res.status(500).json({ message: 'Error logging out', error: error.message });
    }
}

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body

        // 1. Find the user by email
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'User not found' })
        }

        // 2. Generate a secure token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        // console.log(user);

        // 3. Save token to DB with expiry (15 min)
        const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min
        await ResetToken.create({
            userId: user._id,
            token: hashedToken,
            expiresAt: tokenExpiry,
        });

        // 4. Create a reset link
        const resetLink = `${process.env.CLIENT_URL}/resetpassword/${resetToken}`;

        // 5. Send the email
        await sendEmail(
            user.email,
            'Password Reset Request',
            `Hi ${user.name},\n\nClick here to reset your password: ${resetLink}\n\nThis link will expire in 15 minutes.\n\nIf you did not request this, please ignore it.`
        );

        res.status(200).json({ message: 'Password reset link sent to email.', hashedToken });
    } catch (error) {
        console.error('forgetPassword:', error);
        res.status(500).json({ message: 'Error sending reset email', error: error.message });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // console.log(token);

        if (!token || !password) {
            return res.status(400).json({ message: 'Token and new password are required.' });
        }

        // 1. Hash the token to match stored one
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        // 2. Find the token entry in DB
        const tokenDoc = await ResetToken.findOne({
            token: hashedToken,
            expiresAt: { $gt: new Date() }, // token should not be expired
        });
        // console.log('token', token, 'pass', password);
        // console.log('hsedtoken', token);

        // console.log('tokenDoc', tokenDoc);

        if (!tokenDoc) {
            return res.status(400).json({ message: 'Invalid or expired token.' });
        }

        // 3. Find the user and update password
        const user = await User.findById(tokenDoc.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // 4. Hash and update the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        // 5. Delete token after successful reset
        await ResetToken.deleteOne({ _id: tokenDoc._id });

        console.log(`Password reset for user ${user._id}`);
        res.status(200).json({ message: 'Password has been reset successfully.' });
    } catch (error) {
        console.error('resetPassword:', error);
        res.status(500).json({ message: 'Error resetting password', error: error.message });
    }
}


const googleCallbackController = async (req, res) => {
    try {
        const user = req.user
        const token = await generateToken(user)

        // Set secure cookie
        res.cookie('token', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            // sameSite: 'strict',
        });

        const redirectUrl = `${process.env.CLIENT_URL}`
        res.redirect(redirectUrl)
    } catch (error) {
        console.error('googleCallbackController:', error);
        res.status(500).json({ message: 'Error with Google login', error: error.message });
    }
}
module.exports = { signIn, signOut, forgetPassword, resetPassword, googleCallbackController }
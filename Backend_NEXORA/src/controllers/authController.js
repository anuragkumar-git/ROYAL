const bcrypt = require('bcrypt')
const crypto = require('crypto')
const User = require('../models/userModel')
const Business = require('../models/businessModel')
const ResetToken = require('../models/resetTokenModel')
const { generateToken, blackListToken } = require('../utils/tokenUtils')
const sendEmail = require('../utils/sendMail')
const { log } = require('console')

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
        // const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        const resetLink = `${process.env.CLIENT_URL}/resetpassword/${resetToken}`;

        const message = `
        <html><a href="${resetLink}">Click here</a>
        </html>`
        // 5. Send the email
        await sendEmail(
            user.email,
            'Password Reset Request',
            `Hi ${user.name},\n\nClick here to reset your password: ${resetLink}\n\nThis link will expire in 15 minutes.\n\nIf you did not request this, please ignore it.`
            // `Hi ${user.name}, \n\n${message} to reset your password to reset your password. \n\nThis link will expire in 15 minutes. \n\nIf you did not request this, please ignore it.`
        );

        res.status(200).json({ message: 'Password reset link sent to email.', hashedToken });
    }

    catch (error) {
        res.status(500).json({ message: 'Error sending reset email', error: error.message });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;


        if (!token || !password) {
            return res.status(400).json({ message: 'Token and new password are required.' });
        }

        // 1. Hash the token to match stored one
        // const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        // 2. Find the token entry in DB
        const tokenDoc = await ResetToken.findOne({
            // token: hashedToken,
            token,
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

        res.status(200).json({ message: 'Password has been reset successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to reset password.', error: error.message });
    }
};

module.exports = { signIn, signOut, forgetPassword, resetPassword }
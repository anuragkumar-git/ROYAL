const jwt = require('jsonwebtoken')
const blacklistTokenModel = require('../models/blacklistTokenModel');
const Business = require('../models/businessModel');

const generateToken = async (user) => {
    try {
        let payload = {
            _id: user._id,
            role: user.role
        }
        if (user.role === 'business') {
            const business = await Business.findOne({ email: user.email })
            if (!business) throw new Error('Business not found');
            payload._id = business._id,
                payload.owenerId = business.ownerId
        }
        // console.log('payload', payload);
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' })
        return token
    } catch (error) {
        console.error('generateToken:', error);
        // throw new Error(`Token generation failed: ${error.message}`);
        return res.status(500).json({
            message: `Token genration failed!\n ${error.message}`
        })
    }
}


const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log('decoded token:\n', decoded);
        if (decoded.exp <= Date.now() / 1000) throw new Error('Token expired');
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        console.error('verifyToken:', error);
        // throw new Error(`Token verification failed: ${error.message}`);
        return res.status(500).json({
            message: `Token Verification failed!\n ${error.message}`
        });
    }
}

const blackListToken = async (token) => {
    try {
        await blacklistTokenModel.create({ token });
    } catch (error) {
        console.error('blackListToken:', error);
        // throw new Error(`Blacklist creation failed: ${error.message}`);
        return res.status(500).json({ msg: `blacklist creation fails! ${error.message}` })
    }
}

const isTokenBlackListed = async (token) => {
    try {
        const blacklisted = await blacklistTokenModel.findOne({ token });
        return blacklisted
    } catch (error) {
        console.error('isTokenBlackListed:', error);
        // throw new Error(`Blacklist verification failed: ${error.message}`);
        return res.status(500).json({ msg: `blacklist token varification failed! ${error.message}` })
    }
}

module.exports = {
    generateToken, verifyToken, blackListToken, isTokenBlackListed
}
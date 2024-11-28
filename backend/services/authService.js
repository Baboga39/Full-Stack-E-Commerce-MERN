const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1w' });
}
const isTokenExpired = (expiryDate) => {
    const currentTime = new Date();
    return currentTime > expiryDate;
  };
const userDetails = async (userId)=>{
    try {
        const user = await userModel.findById(userId);
        if(!user) throw new Error('User not found');
        return user;
    } catch (error) {
        throw new Error('Internal server error');
    }
}

module.exports = {
    isTokenExpired,
    generateToken,
    userDetails
}
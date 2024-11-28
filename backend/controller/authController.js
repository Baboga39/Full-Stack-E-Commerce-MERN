const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const services = require('../services')


const signUp = async (req, res) => {
    try {
    const {email, password, name, profilePic } = req.body;
    const userData = userModel(req.body); 
    const newUser = await userData.save();
    console.log('Register user successfully')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Register user successfully',
    result: newUser,
    });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            console.log('Email already exists');
            console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Email already exists',
                result: error.message,
            });
        }
        console.log('Internal server error')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
            result: error.message,
          });
    }
};


const signIn = async (req, res) => {
    try {

    const { email, password } = req.body;


    const user = await userModel.findOne({ email });


    if (!user) {
        console.log('User not found');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(404).json({
            success: false,
            statusCode: 404,
            message: 'User not found',
            result: null,
        });
    }


    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        console.log('Please check your password');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: 'Please check your password',
            result: null,
        });
    }

    const payload = {
        id: user._id,
        name: user.name,
        role: user.role,
    };

    const token = services.authService.generateToken(payload);

    const tokenOption = {
        httpOnly: true,
        sercure: true,
    }

    console.log('Login successfully')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.cookie("accessToken",token,tokenOption).status(200).json({
        success: true,
        statusCode: 200,
        message: 'Login  successfully',
        result: token,
    });
    } catch (error) {
        console.log('Internal server error')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
            result: error.message,
        });
    }
};

const userDetails = async (req, res) => {
    try {
    const user = await services.authService.userDetails(req.userId)
    console.log('Get user details successfully')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Get user details successfully',
        result: user,
    })
    } catch (error) {
        console.log(error.message)
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
            result: error.message,
        });
    }
};

const logout = (req, res) => {
    try {
        res.clearCookie("accessToken");
        console.log('Logout successfully')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Logout successfully',
            result: null,
        })
    } catch (error) {
        console.log(error.message)
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
            result: error.message,
        });
   }
}

module.exports = {
    signUp,
    signIn,
    userDetails,
    logout
}
const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const BlackListToken = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
    try {
        console.log('Registering user:', req.body);
        const { fullname, email, password} = req.body;
        const { firstname, lastname } = fullname;
        const hashPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname,
            lastname,
            email,
            password: hashPassword
        });

        console.log('User Registered:', user);
        const token = user.generateAuthToken();

        res.status(201).json({ token, user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');

    // if user email is not found
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    // user email is found, compare password
    const isValid = await user.comparePassword(password);
    if (!isValid) {
        return res.status(401).json({ message: 'Invalid Credentials' });
    }

    // user email and password is correct
    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, user });
};

module.exports.getUserProfile = async (req, res, next) => {
    const user = await userModel.findById(req.user._id);
    res.status(200).json(user);
};

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await BlackListToken.create({ token });
    res.status(200).json({ message: 'Logout Successful' });
};
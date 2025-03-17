const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const BlackListToken = require('../models/blacklistToken.model');
const User = require('../models/user.model');

module.exports.registerUser = async (req, res, next) => {
    try {
        const { fullname, email, password, username } = req.body;
        const { firstname, lastname } = fullname;
        const hashPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname,
            lastname,
            email,
            password: hashPassword,
            username
        });

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

    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
        return res.status(401).json({ message: 'Invalid Credentials' });
    }

    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, user });
};

module.exports.getUserProfile = async (req, res, next) => {
    const user = await userModel.findById(req.user._id);
    res.status(200).json(user);
};

module.exports.followUser = async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user._id);

        if (!userToFollow || !currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!currentUser.following.includes(userToFollow._id)) {
            currentUser.following.push(userToFollow._id);
            userToFollow.followers.push(currentUser._id);

            await currentUser.save();
            await userToFollow.save();

            res.status(200).json({ message: 'User followed successfully' });
        } else {
            res.status(400).json({ message: 'You are already following this user' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports.unfollowUser = async (req, res) => {
    try {
        const userToUnfollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user._id);

        if (!userToUnfollow || !currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (currentUser.following.includes(userToUnfollow._id)) {
            currentUser.following = currentUser.following.filter(
                (userId) => userId.toString() !== userToUnfollow._id.toString()
            );
            userToUnfollow.followers = userToUnfollow.followers.filter(
                (userId) => userId.toString() !== currentUser._id.toString()
            );

            await currentUser.save();
            await userToUnfollow.save();

            res.status(200).json({ message: 'User unfollowed successfully' });
        } else {
            res.status(400).json({ message: 'You are not following this user' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await BlackListToken.create({ token });
    res.status(200).json({ message: 'Logout Successful' });
};
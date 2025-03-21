const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First Name is required'),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters long')
],
userController.registerUser
);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters long')
],
userController.loginUser
);

router.get('/profile', authMiddleware.authUser, userController.getUserProfile);

router.post('/follow/:id', authMiddleware.authUser, userController.followUser);

router.post('/unfollow/:id', authMiddleware.authUser, userController.unfollowUser);


router.get('/logout', authMiddleware.authUser, userController.logoutUser);

module.exports = router;
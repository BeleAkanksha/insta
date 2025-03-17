const express = require('express');
const router = express.Router();
const storyController = require('../controllers/story.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/following', authMiddleware.authUser, storyController.getStoriesFromFollowing);

module.exports = router;
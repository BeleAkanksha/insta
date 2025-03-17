const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create', authMiddleware.authUser, postController.createPost);

router.get('/following', authMiddleware.authUser, postController.getPostsFromFollowing);

router.get('/user', authMiddleware.authUser, postController.getUserPosts);

module.exports = router;
const Post = require('../models/post.model');
const User = require('../models/user.model');

module.exports.createPost = async (req, res) => {
    try {
        const { imageUrl, caption } = req.body;
        const newPost = new Post({
            author: req.user._id,
            imageUrl,
            caption
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports.getPostsFromFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('following');
        const posts = await Post.find({ author: { $in: user.following } }).sort({ createdAt: -1 }).populate('author');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports.getUserPosts = async (req, res) => {
    try {
      const posts = await Post.find({ author: req.user._id }).sort({ createdAt: -1 }).populate('author');
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  };
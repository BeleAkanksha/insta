const Story = require('../models/story.model');
const User = require('../models/user.model');

module.exports.getStoriesFromFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('following');
        const stories = await Story.find({ author: { $in: user.following } }).sort({ createdAt: -1 }).populate('author');
        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        default: ''
    },
    likes: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: []
    },
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
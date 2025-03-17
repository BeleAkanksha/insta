const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours
    }
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    profilePicture: {
        type: String,
    },
    followers: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: []
    },
    following: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: []
    },
    bio: {
        type: String,
        default: ''
    },
    posts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
        default: []
    }
});

userSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
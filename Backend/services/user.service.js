const userModel = require('../models/user.model');

module.exports.createUser = async ({ firstname, lastname, email, password, username }) => {
    if (!firstname || !lastname || !email || !password || !username) {
        throw new Error('All fields are required');
    }
    try {
        const user = await userModel.create({
            fullname: {
                firstname,
                lastname
            },
            email,
            password,
            username
        });
        return user;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};
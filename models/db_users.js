const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserByUsername = function (userName, callback) {
    const query = {
        user_name: userName
    };
    User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
    newUser.save(callback);
}

module.exports.comparePassword = function (enteredPassword, userPassword, callback) {
    callback(null, enteredPassword.localeCompare(userPassword) == 0);
}

module.exports.validateUser = function (user) {
    return (user.active == true);
}


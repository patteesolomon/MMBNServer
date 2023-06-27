const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
    },
    password: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 8
    }
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
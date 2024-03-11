
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    username: { type: String, default: '' },
    password: { type: String, default: '' },
});

module.exports = mongoose.model('Account', Account);

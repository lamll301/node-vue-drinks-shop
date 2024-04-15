
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Permission = new Schema({
    name: { type: String },
    description: { type: String },
});

module.exports = mongoose.model('Permission', Permission);

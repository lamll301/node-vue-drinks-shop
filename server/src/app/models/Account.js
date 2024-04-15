
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    permission_id: [{ type: Schema.Types.ObjectId, ref: 'Permission' }]
});

module.exports = mongoose.model('Account', Account);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, default: 'Hoạt động' },
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
    permission_id: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
});

module.exports = mongoose.model('Account', Account);

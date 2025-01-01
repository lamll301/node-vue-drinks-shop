
const mongoose = require('mongoose')

async function connect() {
    try {
        // mongodb://localhost:27017/drinks_shop_dev
        await mongoose.connect('mongodb+srv://root:1234@cluster0.pnngwnu.mongodb.net/drinks_shop_dev', {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('Connected successfully!');
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected. Attempting to reconnect...');
            connect();
        });
    } catch (error) {
        console.error('Connection failed:', error);
        setTimeout(connect, 5000);
    }
}

module.exports = { connect }
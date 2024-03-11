
const mongoose = require('mongoose')

async function connect() {

    try {
        await mongoose.connect('mongodb+srv://root:1234@cluster0.pnngwnu.mongodb.net/drinks_shop_dev')
        console.log('Connected successfully!')
    }
    catch (error) {
        console.log('Connection failed!')
    }
}

module.exports = { connect }
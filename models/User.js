const mongoose = require('../db')

const UserSchema = new mongoose.Schema({
    email: { type: String, require: true },
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    password: { type: String, require: true },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', UserSchema)
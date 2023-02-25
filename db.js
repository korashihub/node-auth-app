const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/nodeauth_db';

mongoose.set("strictQuery", false);
mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

module.exports = mongoose;

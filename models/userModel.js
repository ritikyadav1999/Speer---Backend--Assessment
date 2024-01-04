const mongoose = require('mongoose');
const { notesSchema } = require('../models/notesSchema');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true

    },
    notes: [notesSchema]
})


const User = mongoose.model('User', userSchema);
module.exports = User
const mongoose = require('mongoose');

exports.notesSchema = mongoose.Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
    }
})



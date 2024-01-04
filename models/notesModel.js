const mongoose = require('mongoose');
const { notesSchema } = require('./notesSchema');
const Note = mongoose.model('Note', notesSchema);
module.exports = Note;
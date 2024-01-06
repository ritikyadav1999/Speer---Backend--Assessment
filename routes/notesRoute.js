const mongoose = require('mongoose');
const express = require('express');
const { requireSignIn } = require('../middlewares/authMiddleware');

const {
    getAllNotes,
    getNoteById,
    createNote,
    updateNoteById,
    deleteNoteById,
    shareNoteById,
    search
} = require('../controllers/notesController');

const router = express.Router();


// routes
router.get('/search', requireSignIn, search);
router.get('/', requireSignIn, getAllNotes)
router.get('/:id', requireSignIn, getNoteById)
router.post("/", requireSignIn, createNote)
router.put("/:id", requireSignIn, updateNoteById)
router.delete("/:id", requireSignIn, deleteNoteById)
router.post('/:id/share', requireSignIn, shareNoteById)



module.exports = router;

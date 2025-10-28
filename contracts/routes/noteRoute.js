const express = require("express");
const {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote,
    getNotesStats
} = require("../controllers/noteController");

const router = express.Router();

// CRUD Routes for Notes
router.route("/")
    .post(createNote)      // POST /notes - Create a new note
    .get(getAllNotes);     // GET /notes - Retrieve all notes

router.route("/stats")
    .get(getNotesStats);   // GET /notes/stats - Get notes statistics

router.route("/:id")
    .get(getNoteById)      // GET /notes/:id - Retrieve a specific note by ID
    .put(updateNote)       // PUT /notes/:id - Update a note by ID
    .delete(deleteNote);   // DELETE /notes/:id - Delete a note by ID

module.exports = router;

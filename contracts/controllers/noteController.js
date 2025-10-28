const Note = require("../models/Note");
const asyncErrorHandler = require("../middlewares/helpers/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");
const Logger = require("../utils/logger");
const { v4: uuidv4, validate: validateUUID } = require('uuid');

/**
 * Create a new note
 * POST /notes
 */
exports.createNote = asyncErrorHandler(async (req, res, next) => {
    const { title, content } = req.body;

    // Validation
    if (!title && !content) {
        return next(new ErrorHandler("Note must have either title or content", 400));
    }

    const noteData = {
        title: title || '',
        content: content || ''
    };

    const note = Note.create(noteData);
    
    Logger.logApiCall('/notes', 'POST', noteData, note);

    res.status(201).json({
        success: true,
        message: "Note created successfully",
        data: note
    });
});

/**
 * Get all notes
 * GET /notes
 */
exports.getAllNotes = asyncErrorHandler(async (req, res, next) => {
    const notes = Note.findAll();
    
    Logger.logApiCall('/notes', 'GET', null, { count: notes.length, notes });

    res.status(200).json({
        success: true,
        message: "Notes retrieved successfully",
        count: notes.length,
        data: notes
    });
});

/**
 * Get a specific note by ID
 * GET /notes/:id
 */
exports.getNoteById = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;
    
    // Validate UUID format
    if (!validateUUID(id)) {
        return next(new ErrorHandler(`Invalid UUID format: ${id}`, 400));
    }
    
    const note = Note.findById(id);
    
    if (!note) {
        return next(new ErrorHandler(`Note not found with id: ${id}`, 404));
    }

    Logger.logApiCall(`/notes/${id}`, 'GET', null, note);

    res.status(200).json({
        success: true,
        message: "Note retrieved successfully",
        data: note
    });
});

/**
 * Update a note by ID
 * PUT /notes/:id
 */
exports.updateNote = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;
    const { title, content } = req.body;

    // Validate UUID format
    if (!validateUUID(id)) {
        return next(new ErrorHandler(`Invalid UUID format: ${id}`, 400));
    }

    // Check if note exists
    const existingNote = Note.findById(id);
    if (!existingNote) {
        return next(new ErrorHandler(`Note not found with id: ${id}`, 404));
    }

    // Validation
    if (!title && !content) {
        return next(new ErrorHandler("Note must have either title or content", 400));
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;

    const updatedNote = Note.updateById(id, updateData);
    
    Logger.logApiCall(`/notes/${id}`, 'PUT', updateData, updatedNote);

    res.status(200).json({
        success: true,
        message: "Note updated successfully",
        data: updatedNote
    });
});

/**
 * Delete a note by ID
 * DELETE /notes/:id
 */
exports.deleteNote = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;
    
    // Validate UUID format
    if (!validateUUID(id)) {
        return next(new ErrorHandler(`Invalid UUID format: ${id}`, 400));
    }
    
    const deletedNote = Note.deleteById(id);
    
    if (!deletedNote) {
        return next(new ErrorHandler(`Note not found with id: ${id}`, 404));
    }

    Logger.logApiCall(`/notes/${id}`, 'DELETE', null, deletedNote);

    res.status(200).json({
        success: true,
        message: "Note deleted successfully",
        data: deletedNote
    });
});

/**
 * Get notes statistics
 * GET /notes/stats
 */
exports.getNotesStats = asyncErrorHandler(async (req, res, next) => {
    const totalNotes = Note.count();
    const notes = Note.findAll();
    
    const stats = {
        totalNotes,
        notesWithTitle: notes.filter(note => note.title).length,
        notesWithContent: notes.filter(note => note.content).length,
        emptyNotes: notes.filter(note => !note.title && !note.content).length,
        createdAt: new Date().toISOString()
    };

    Logger.logApiCall('/notes/stats', 'GET', null, stats);

    res.status(200).json({
        success: true,
        message: "Notes statistics retrieved successfully",
        data: stats
    });
});

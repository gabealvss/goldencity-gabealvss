/**
 * In-Memory Notes Model
 * Simple in-memory storage for notes CRUD operations with UUID support
 */

const { v4: uuidv4 } = require('uuid');

class Note {
    constructor() {
        this.notes = [];
    }

    // Create a new note
    create(noteData) {
        const note = {
            id: uuidv4(),
            title: noteData.title || '',
            content: noteData.content || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.notes.push(note);
        return note;
    }

    // Get all notes
    findAll() {
        return [...this.notes]; // Return a copy to prevent external mutations
    }

    // Find note by ID
    findById(id) {
        return this.notes.find(note => note.id === id);
    }

    // Update note by ID
    updateById(id, updateData) {
        const noteIndex = this.notes.findIndex(note => note.id === id);
        
        if (noteIndex === -1) {
            return null;
        }

        const updatedNote = {
            ...this.notes[noteIndex],
            ...updateData,
            id: id, // Ensure ID doesn't change
            createdAt: this.notes[noteIndex].createdAt, // Preserve original creation date
            updatedAt: new Date().toISOString()
        };

        this.notes[noteIndex] = updatedNote;
        return updatedNote;
    }

    // Delete note by ID
    deleteById(id) {
        const noteIndex = this.notes.findIndex(note => note.id === id);
        
        if (noteIndex === -1) {
            return null;
        }

        const deletedNote = this.notes[noteIndex];
        this.notes.splice(noteIndex, 1);
        return deletedNote;
    }

    // Get total count
    count() {
        return this.notes.length;
    }

    // Clear all notes (useful for testing)
    clear() {
        this.notes = [];
    }
}

// Export singleton instance
module.exports = new Note();

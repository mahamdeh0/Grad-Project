const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    publicationYear: Number,
    pdfContent: { 
        type: Buffer,
        required: true,
    },
    teacher: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
        required: true,
    },
    Tags: {
        type: [String]
    },
    Category: {
        type: String 
    }
}, { timestamps: true });

const BookModel = mongoose.model('Book', bookSchema);
module.exports = {BookModel};

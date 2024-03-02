const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            maxLength: 100,
            minLength: 5,
            required: true
        },

        author: {
            type: String,
            minLength: 5,
            maxLength:100,
            required: true
        },

        genre: {
            type: String,
            maxLength: 100,
            minLength: 5
        },
    }
)
const Book = mongoose.model("Book", bookSchema)
module.exports = Book;
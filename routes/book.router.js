const express = require("express")
const router = express.Router()

const {
    getAllBooks,
    getbookById,
    addBook,
    updateBook,
    deleteBook
} = require("../controllers/book.controller")

//GET
router.get("/", getAllBooks)
router.get("/:id", getbookById)

// POST 
router.post("/", addBook)

// PATCH
router.patch("/:id", updateBook)

// DELETE
router.delete("/:id", deleteBook)

module.exports = router;
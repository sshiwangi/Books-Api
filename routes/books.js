const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books");

router.post("/books", booksController.createBook);
router.get("/books", booksController.getBooks);
router.get("/books/:id", booksController.getBookById);
router.delete("/books/:id", booksController.deleteBook);
router.put("/books/:id", booksController.updateBook);
router.get("/books/author", booksController.getBooksByAuthor);
module.exports = router;

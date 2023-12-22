const Book = require("../models/bookModel");

exports.createBook = async (req, res) => {
  try {
    const newBook = req.body;
    const createdBook = await Book.create(newBook);
    res.json(createdBook);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.getBooks = async (req, res) => {
  try {
    const authorName = req.query.author;
    let query = {};

    if (authorName) {
      query = { author: authorName };
    }

    const books = await Book.find(query);
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).send("Book not found");
    }

    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).send("Book not found");
    }

    res.status(200).send("Book deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const updatedBookData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedBookData, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).send("Book not found");
    }

    res.json(updatedBook);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.getBooksByAuthor = async (req, res) => {
  try {
    console.log(req.query.author);
    const authorName = req.query.author;

    let query = {};

    if (authorName) {
      query = { author: authorName };
    }

    const books = await Book.find(query);
    console.log(books);

    if (books.length === 0) {
      return res
        .status(404)
        .send(
          `No books found${authorName ? ` for author: ${authorName}` : ""}`
        );
    }
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

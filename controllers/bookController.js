const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('reviews');
    res.status(200).json({
      status: 'success',
      results: books.length,
      data: { books }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.getBookByISBN = async (req, res) => {
  try {
    const book = await Book.findOne({ isbn: req.params.isbn }).populate('reviews');
    if (!book) {
      return res.status(404).json({
        status: 'fail',
        message: 'Book not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: { book }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.createBook = async (req, res) => {
  try {
    // Extract book details from request body
    const { isbn, title, author, description, publishedYear, reviews } = req.body;

    // Create a new book in the database
    const newBook = await Book.create({
      isbn,
      title,
      author,
      description,
      publishedYear,
      reviews
    });

    // Respond with the created book details
    res.status(201).json({
      status: 'success',
      data: { book: newBook }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.getBooksByAuthor = async (req, res) => {
  try {
    const books = await Book.find({ author: new RegExp(req.params.author, 'i') }).populate('reviews');
    res.status(200).json({
      status: 'success',
      results: books.length,
      data: { books }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.getBooksByTitle = async (req, res) => {
  try {
    const books = await Book.find({ title: new RegExp(req.params.title, 'i') }).populate('reviews');
    res.status(200).json({
      status: 'success',
      results: books.length,
      data: { books }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
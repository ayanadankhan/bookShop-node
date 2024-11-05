const Book = require('../models/Book');

// Get all books
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

// Get a book by ISBN
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

// Get books by author
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

// Get books by title
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

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const { isbn, title, author, description, publishedYear, reviews, imageUrl } = req.body;
    const newBook = await Book.create({
      isbn,
      title,
      author,
      description,
      publishedYear,
      reviews,
      imageUrl
    });
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

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('reviews');
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

// Update an existing book by ID
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const book = await Book.findByIdAndUpdate(id, updates, {
      new: true,             // Return the updated book
      runValidators: true    // Ensure validations are run on updates
    }).populate('reviews');

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

// Delete a book by ID
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({
        status: 'fail',
        message: 'Book not found'
      });
    }

    res.status(204).json({
      status: 'success',
      data: null // No content for successful deletion
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

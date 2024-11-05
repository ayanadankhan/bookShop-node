const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const reviewRouter = require('./reviewRoutes');

router.use('/:bookId/reviews', reviewRouter);

router.get('/', bookController.getAllBooks);
router.get('/isbn/:isbn', bookController.getBookByISBN);
router.get('/author/:author', bookController.getBooksByAuthor);
router.get('/title/:title', bookController.getBooksByTitle);
router.get('/:id', bookController.getBookById); 
router.post('/', bookController.createBook);
router.patch('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
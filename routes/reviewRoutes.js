const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth'); // Updated import

router.get('/', reviewController.getBookReviews);
router.post('/', auth.protect, reviewController.createReview);
router.patch('/:reviewId', auth.protect, reviewController.updateReview);
router.delete('/:reviewId', auth.protect, reviewController.deleteReview);

module.exports = router;
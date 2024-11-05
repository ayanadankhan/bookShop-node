const Review = require('../models/Reviews');
const Book = require('../models/Book');

exports.getBookReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId })
      .populate('user', 'username')
      .populate('book', 'title');

    res.status(200).json({
      status: 'success',
      results: reviews.length,
      data: { reviews }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const bookId = req.params.bookId;

    // Create the review
    const review = await Review.create({
      rating,
      comment,
      book: bookId,
      user: req.user._id
    });

    // Add review to the book's reviews array
    await Book.findByIdAndUpdate(bookId, {
      $push: { reviews: review._id }
    });

    // Use aggregation to populate user and book
    const populatedReview = await Review.aggregate([
      { $match: { _id: review._id } },
      {
        $lookup: {
          from: 'users',             // Collection name of the 'user' model
          localField: 'user',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },         // Convert user array to an object
      {
        $lookup: {
          from: 'books',             // Collection name of the 'book' model
          localField: 'book',
          foreignField: '_id',
          as: 'book'
        }
      },
      { $unwind: '$book' },         // Convert book array to an object
      {
        $project: {
          rating: 1,
          comment: 1,
          'user.username': 1,        // Include only the username from user
          'book.title': 1,           // Include only the title from book
          createdAt: 1
        }
      }
    ]);

    res.status(201).json({
      status: 'success',
      data: { review: populatedReview[0] } // Access first item in array
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};


exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.reviewId,
      user: req.user._id
    });

    if (!review) {
      return res.status(404).json({
        status: 'fail',
        message: 'Review not found or not authorized'
      });
    }

    Object.assign(review, req.body);
    await review.save();

    res.status(200).json({
      status: 'success',
      data: { review }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.reviewId,
      user: req.user._id
    });

    if (!review) {
      return res.status(404).json({
        status: 'fail',
        message: 'Review not found or not authorized'
      });
    }

    await Book.findByIdAndUpdate(review.book, {
      $pull: { reviews: review._id }
    });

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
// Create a file called seedBooks.js
const mongoose = require('mongoose');
const Book = require('./models/Book');
require('dotenv').config();

const sampleBooks = [
  {
    isbn: "1234567890",
    title: "Sample Book 1",
    author: "John Doe",
    description: "First sample book",
    publishedYear: 2023
  },
  {
    isbn: "0987654321",
    title: "Sample Book 2",
    author: "Jane Smith",
    description: "Second sample book",
    publishedYear: 2024
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    await Book.deleteMany({});
    await Book.insertMany(sampleBooks);
    console.log('Sample books added successfully');
    process.exit();
  })
  .catch(err => {
    console.error('Error seeding books:', err);
    process.exit(1);
  });
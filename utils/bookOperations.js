// utils/bookOperations.js
const axios = require('axios');
const BASE_URL = 'http://localhost:3000/api';

// Task 10: Get all books using async callback
const getAllBooks = async (callback) => {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    callback(null, response.data);
  } catch (error) {
    callback(error);
  }
};

// Task 11: Search by ISBN using Promises
const searchByISBN = (isbn) => {
  return new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}/books/isbn/${isbn}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

// Task 12: Search by Author using async/await
const searchByAuthor = async (author) => {
  try {
    const response = await axios.get(`${BASE_URL}/books/author/${author}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Task 13: Search by Title using async/await
const searchByTitle = async (title) => {
  try {
    const response = await axios.get(`${BASE_URL}/books/title/${title}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Example usage of the functions
const demonstrateBookOperations = async () => {
  // Using callback function
  getAllBooks((error, books) => {
    if (error) {
      console.error('Error getting all books:', error.message);
    } else {
      console.log('All books retrieved:', books);
    }
  });

  // Using Promise
  try {
    const isbnResult = await searchByISBN('1234567890');
    console.log('Book found by ISBN:', isbnResult);
  } catch (error) {
    console.error('Error searching by ISBN:', error.message);
  }

  // Using async/await for author search
  try {
    const authorResult = await searchByAuthor('John Doe');
    console.log('Books found by author:', authorResult);
  } catch (error) {
    console.error('Error searching by author:', error.message);
  }

  // Using async/await for title search
  try {
    const titleResult = await searchByTitle('Sample Book');
    console.log('Books found by title:', titleResult);
  } catch (error) {
    console.error('Error searching by title:', error.message);
  }
};

module.exports = {
  getAllBooks,
  searchByISBN,
  searchByAuthor,
  searchByTitle,
  demonstrateBookOperations
};

// Optional: Create a separate file to run the demonstrations
// demo.js
/*
const { demonstrateBookOperations } = require('./bookOperations');

console.log('Starting book operations demonstration...');
demonstrateBookOperations()
  .then(() => console.log('Demonstration completed'))
  .catch(error => console.error('Demonstration failed:', error));
*/
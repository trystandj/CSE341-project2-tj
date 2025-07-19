/* eslint-disable no-undef */
const { booksDB } = require('../data/database');
const { getBookModel } = require('../models/book');

const getAllBooks = async (req, res) => {
  try {
    const Book = getBookModel(booksDB());
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books', error: err.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const Book = getBookModel(booksDB());
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching book', error: err.message });
  }
};

const createBook = async (req, res) => {
  try {
    const Book = getBookModel(booksDB());
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({message: 'Book created successfully', book });
  } catch (err) {
    res.status(400).json({ message: 'Error creating book', error: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const Book = getBookModel(booksDB());
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({message: 'Book updated successfully', book });
  } catch (err) {
    res.status(400).json({ message: 'Error updating book', error: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const Book = getBookModel(booksDB());
    const result = await Book.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting book', error: err.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
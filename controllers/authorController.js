/* eslint-disable no-undef */
const { authorsDB } = require('../data/database');
const { getAuthorModel } = require('../models/authors');

const getAllAuthors = async (req, res) => {
  try {
    const Author = getAuthorModel(authorsDB());
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching authors', error: err.message });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const Author = getAuthorModel(authorsDB());
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching author', error: err.message });
  }
};

const createAuthor = async (req, res) => {
  try {
    const Author = getAuthorModel(authorsDB());
    const author = new Author(req.body);
    await author.save();
    res.status(201).json({message: 'Author created successfully', author });
  } catch (err) {
    res.status(400).json({ message: 'Error creating author', error: err.message });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const Author = getAuthorModel(authorsDB());
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.status(200).json({message: 'Author updated successfully', author });
  } catch (err) {
    res.status(400).json({ message: 'Error updating author', error: err.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const Author = getAuthorModel(authorsDB());
    const result = await Author.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Author not found' });
    res.status(200).json({ message: 'Author deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting author', error: err.message });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
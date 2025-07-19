/* eslint-disable no-undef */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: String,
  published_year: {
    type: Number,
    min: 1000,
    max: new Date().getFullYear()
  },
  isbn: {
    type: String,
    match: /^(97(8|9))?\d{9}(\d|X)$/
  },
  pages: {
    type: Number,
    min: 1
  },
  available: {
    type: Boolean,
    default: true
  },
  best_seller: Boolean,
}, { timestamps: true });

const getBookModel = (connection) => {
  return connection.model('Book', bookSchema);
};

module.exports = {
  bookSchema,
  getBookModel
};

/* eslint-disable no-undef */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorSchema = new Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  age: Number,
  nationality: String,
  notable_work: String,
  awards: [String],
  alive: Boolean,
});

const getAuthorModel = (connection) => {
  return connection.model('Author', authorSchema);
};

module.exports = {
  authorSchema,
  getAuthorModel
};
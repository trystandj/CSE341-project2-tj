/* eslint-disable no-undef */
const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI_Books = process.env.MONGODB_URI_Books;
const MONGODB_URI_Authors = process.env.MONGODB_URI_Authors;

let booksDB;
let authorsDB;

const connectDatabases = async () => {
  try {
    console.log('Attempting to connect to Books database...');
    booksDB = await mongoose.createConnection(MONGODB_URI_Books);
    console.log("Connected to Books Cluster");

    console.log('Attempting to connect to Authors database...');
    authorsDB = await mongoose.createConnection(MONGODB_URI_Authors);
    console.log("Connected to Authors Cluster");

    // Wait for connections to be ready
    booksDB.on('connected', () => {
      console.log('Books DB connected successfully');
    });
    
    authorsDB.on('connected', () => {
      console.log('Authors DB connected successfully');
    });

  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    console.error("Full error:", err);
    process.exit(1);
  }
};

const getBooksDB = () => booksDB;
const getAuthorsDB = () => authorsDB;

module.exports = {
  connectDatabases,
  booksDB: getBooksDB,
  authorsDB: getAuthorsDB,
};
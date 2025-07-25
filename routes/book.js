/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const bookValidation = require('../utilities/booksValidator');
const {handleValidation, isAuthenticated} = require('../utilities/validate'); 


router.get('/', bookController.getAllBooks);
router.get('/:id', bookValidation.validateBookId, handleValidation, bookController.getBookById);
router.post('/', isAuthenticated, bookValidation.validateBookBody, handleValidation, bookController.createBook);
router.put('/:id',isAuthenticated,  bookValidation.validateBookId, bookValidation.validateBookBody, handleValidation, bookController.updateBook);
router.delete('/:id',isAuthenticated,  bookValidation.validateBookId, handleValidation, bookController.deleteBook);


module.exports = router;
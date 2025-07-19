/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const bookValidation = require('../utilities/booksValidator');
const handleValidation = require('../utilities/validate'); 

router.get('/', bookController.getAllBooks);
router.get('/:id', bookValidation.validateBookId, handleValidation, bookController.getBookById);
router.post('/', bookValidation.validateBookBody, handleValidation, bookController.createBook);
router.put('/:id', bookValidation.validateBookId, bookValidation.validateBookBody, handleValidation, bookController.updateBook);
router.delete('/:id', bookValidation.validateBookId, handleValidation, bookController.deleteBook);


module.exports = router;
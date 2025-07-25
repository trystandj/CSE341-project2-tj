/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const authorValidation = require('../utilities/authorValidator');
const { handleValidation, isAuthenticated } = require('../utilities/validate');

router.get('/', authorController.getAllAuthors);
router.get('/:id', authorValidation.validateAuthorId, handleValidation, authorController.getAuthorById);

// Protected routes
router.post('/', isAuthenticated, authorValidation.validateAuthorBody, handleValidation, authorController.createAuthor);
router.put('/:id', isAuthenticated, authorValidation.validateAuthorId, handleValidation, authorController.updateAuthor);
router.delete('/:id', isAuthenticated, authorValidation.validateAuthorId, handleValidation, authorController.deleteAuthor);

module.exports = router;
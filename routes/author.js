/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const handleValidation = require('../utilities/validate'); 
const authorValidation = require('../utilities/authorValidator');

router.get('/', authorController.getAllAuthors);
router.get('/:id', authorValidation.validateAuthorId,  handleValidation, authorController.getAuthorById);
router.post('/', authorValidation.validateAuthorBody,  handleValidation,  authorController.createAuthor);
router.put('/:id', authorValidation.validateAuthorId, handleValidation,  authorController.updateAuthor);
router.delete('/:id', authorValidation.validateAuthorId, handleValidation,  authorController.deleteAuthor);

module.exports = router;
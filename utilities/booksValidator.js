/* eslint-disable no-undef */
const { body, param } = require('express-validator');

const currentYear = new Date().getFullYear();

const validateBookBody = [
  body('title')
    .exists().withMessage('Title is required')
    .isString().withMessage('Title must be a string'),

  body('author')
    .exists().withMessage('Author is required')
    .isString().withMessage('Author must be a string'),

  body('publishedYear')
    .optional()
    .isInt({ min: 1000, max: currentYear })
    .withMessage(`Published Year must be between 1000 and ${currentYear}`),

  body('isbn')
    .optional()
    .matches(/^(97(8|9))?\d{9}(\d|X)$/)
    .withMessage('ISBN must be a valid format'),

  body('pages')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Pages must be a positive integer'),

  body('available')
    .optional()
    .isBoolean()
    .withMessage('Available must be a boolean'),

  body('best_seller')
    .optional()
    .isBoolean()
    .withMessage('Best seller must be a boolean'),
];


const validateBookId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid book ID format'),
];

module.exports = {
  validateBookBody,
  validateBookId
};

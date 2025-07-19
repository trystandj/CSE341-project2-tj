/* eslint-disable no-undef */
const { body, param } = require('express-validator');

const validateAuthorBody = [
  body('name')
    .exists().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),

  body('dob')
    .exists().withMessage('Date of birth is required')
    .isISO8601().toDate().withMessage('Date of birth must be a valid date'),

  body('age')
    .optional()
    .isInt({ min: 0 }).withMessage('Age must be a positive integer'),

  body('nationality')
    .optional()
    .isString().withMessage('Nationality must be a string'),

  body('notable_work')
    .optional()
    .isString().withMessage('Notable work must be a string'),

  body('awards')
    .optional()
    .isArray().withMessage('Awards must be an array of strings')
    .custom((arr) => arr.every(item => typeof item === 'string'))
    .withMessage('All awards must be strings'),

  body('alive')
    .optional()
    .isBoolean().withMessage('Alive must be a boolean'),
];

const validateAuthorId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid author ID format'),
];

module.exports = {
  validateAuthorBody,
  validateAuthorId,
};

import { body, param, query, validationResult } from 'express-validator';

// Handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};

// User validation rules
export const validateRegister = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

// Property validation rules
export const validateProperty = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 20, max: 1000 })
    .withMessage('Description must be between 20 and 1000 characters'),
  body('category')
    .isIn(['House', 'Apartment', 'Villa', 'Cottage', 'Penthouse', 'Residence', 'Property', 'Home'])
    .withMessage('Invalid property category'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('area')
    .isFloat({ min: 1 })
    .withMessage('Area must be at least 1 square meter'),
  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),
  body('city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('country')
    .trim()
    .notEmpty()
    .withMessage('Country is required'),
  body('facilities.bedrooms')
    .isInt({ min: 0 })
    .withMessage('Bedrooms must be a non-negative integer'),
  body('facilities.bathrooms')
    .isInt({ min: 0 })
    .withMessage('Bathrooms must be a non-negative integer'),
  body('facilities.parkings')
    .isInt({ min: 0 })
    .withMessage('Parking spaces must be a non-negative integer'),
];

// Booking validation rules
export const validateBooking = [
  body('property')
    .isMongoId()
    .withMessage('Invalid property ID'),
  body('checkIn')
    .isISO8601()
    .toDate()
    .withMessage('Invalid check-in date'),
  body('checkOut')
    .isISO8601()
    .toDate()
    .withMessage('Invalid check-out date'),
  body('guests')
    .isInt({ min: 1 })
    .withMessage('At least 1 guest is required'),
  body('contactInfo.phone')
    .isMobilePhone()
    .withMessage('Invalid phone number'),
  body('contactInfo.email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address'),
];

// MongoDB ObjectId validation
export const validateObjectId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format'),
];

// Search validation
export const validateSearch = [
  query('q')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters'),
  query('category')
    .optional()
    .isIn(['House', 'Apartment', 'Villa', 'Cottage', 'Penthouse', 'Residence', 'Property', 'Home'])
    .withMessage('Invalid category'),
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be a positive number'),
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be a positive number'),
  query('city')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('City must be between 1 and 50 characters'),
  query('country')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Country must be between 1 and 50 characters'),
];
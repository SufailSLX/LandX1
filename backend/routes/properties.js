import express from 'express';
import {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  searchProperties,
  getFeaturedProperties,
  getPropertiesByOwner,
  toggleFeatured,
  incrementViews
} from '../controllers/propertyController.js';
import { protect, agent, admin } from '../middleware/auth.js';
import {
  validateProperty,
  validateObjectId,
  validateSearch,
  handleValidationErrors
} from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', validateSearch, handleValidationErrors, getAllProperties);
router.get('/search', validateSearch, handleValidationErrors, searchProperties);
router.get('/featured', getFeaturedProperties);
router.get('/:id', validateObjectId, handleValidationErrors, getPropertyById);
router.put('/:id/views', validateObjectId, handleValidationErrors, incrementViews);

// Protected routes
router.post('/', protect, agent, validateProperty, handleValidationErrors, createProperty);
router.put('/:id', protect, validateObjectId, validateProperty, handleValidationErrors, updateProperty);
router.delete('/:id', protect, validateObjectId, handleValidationErrors, deleteProperty);
router.get('/owner/:ownerId', protect, getPropertiesByOwner);

// Admin routes
router.put('/:id/featured', protect, admin, validateObjectId, handleValidationErrors, toggleFeatured);

export default router;
import express from 'express';
import {
  getUserFavourites,
  addToFavourites,
  removeFromFavourites,
  checkFavourite
} from '../controllers/favouriteController.js';
import { protect } from '../middleware/auth.js';
import { validateObjectId, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.get('/', protect, getUserFavourites);
router.post('/', protect, addToFavourites);
router.delete('/:propertyId', protect, validateObjectId, handleValidationErrors, removeFromFavourites);
router.get('/check/:propertyId', protect, validateObjectId, handleValidationErrors, checkFavourite);

export default router;
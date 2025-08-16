import express from 'express';
import {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBooking,
  cancelBooking,
  getPropertyAvailability,
  getAllBookings
} from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/auth.js';
import {
  validateBooking,
  validateObjectId,
  handleValidationErrors
} from '../middleware/validation.js';

const router = express.Router();

// Protected routes
router.post('/', protect, validateBooking, handleValidationErrors, createBooking);
router.get('/', protect, getUserBookings);
router.get('/availability/:propertyId', getPropertyAvailability);
router.get('/:id', protect, validateObjectId, handleValidationErrors, getBookingById);
router.put('/:id', protect, validateObjectId, handleValidationErrors, updateBooking);
router.delete('/:id', protect, validateObjectId, handleValidationErrors, cancelBooking);

// Admin routes
router.get('/admin/all', protect, admin, getAllBookings);

export default router;
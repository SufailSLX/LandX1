import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/auth.js';
import { validateObjectId, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// Admin routes
router.get('/', protect, admin, getAllUsers);
router.get('/stats', protect, admin, getUserStats);
router.get('/:id', protect, admin, validateObjectId, handleValidationErrors, getUserById);
router.put('/:id', protect, admin, validateObjectId, handleValidationErrors, updateUser);
router.delete('/:id', protect, admin, validateObjectId, handleValidationErrors, deleteUser);

export default router;
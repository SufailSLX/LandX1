import express from 'express';
import { 
  register, 
  login, 
  logout, 
  getProfile, 
  updateProfile, 
  refreshToken,
  forgotPassword,
  resetPassword 
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { 
  validateRegister, 
  validateLogin, 
  handleValidationErrors 
} from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/register', validateRegister, handleValidationErrors, register);
router.post('/login', validateLogin, handleValidationErrors, login);
router.post('/logout', logout);
router.post('/refresh', refreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router;
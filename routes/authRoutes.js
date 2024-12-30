const express = require('express');
const {
  registerUser,
  loginUser,
  updateUser,
  getMe,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.put('/update', protect, updateUser);

router.get('/me', protect, getMe);

module.exports = router;

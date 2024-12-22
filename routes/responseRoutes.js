const express = require('express');
const {
  createResponse,
  getAllResponsesForForm,
  getResponseById,
} = require('../controllers/responseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:formId', protect, createResponse);
router.get('/:formId', protect, getAllResponsesForForm);
router.get('/:responseId', protect, getResponseById);

module.exports = router;

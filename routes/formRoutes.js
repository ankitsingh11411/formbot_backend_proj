const express = require('express');
const {
  createForm,
  getFormsInFolder,
  updateForm,
  deleteForm,
} = require('../controllers/formController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createForm);
router.get('/:folderId', protect, getFormsInFolder);
router.put('/:formId', protect, updateForm);
router.delete('/:formId', protect, deleteForm);

module.exports = router;

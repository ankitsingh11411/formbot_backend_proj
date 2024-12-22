const express = require('express');
const {
  createFolder,
  getFolders,
  updateFolder,
  deleteFolder,
} = require('../controllers/folderController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createFolder);
router.get('/', protect, getFolders);
router.put('/:id', protect, updateFolder);
router.delete('/:id', protect, deleteFolder);

module.exports = router;

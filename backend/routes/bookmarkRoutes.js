const express = require('express');
const router = express.Router();
const {
  getBookmarks,
  addBookmark,
  removeBookmark,
  checkBookmarkStatus
} = require('../controllers/bookmarkController');
const { protect } = require('../middleware/authMiddleware');

// All bookmark routes require authentication
router.use(protect);

router.get('/', getBookmarks);
router.get('/check/:termId', checkBookmarkStatus);
router.post('/:termId', addBookmark);
router.delete('/:termId', removeBookmark);

module.exports = router;

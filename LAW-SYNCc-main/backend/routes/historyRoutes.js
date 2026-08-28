const express = require('express');
const router = express.Router();
const {
  getHistory,
  addHistory,
  deleteHistoryItem,
  clearHistory
} = require('../controllers/historyController');
const { protect } = require('../middleware/authMiddleware');

// All history routes require authentication
router.use(protect);

router
  .route('/')
  .get(getHistory)
  .delete(clearHistory);

router.post('/:termId', addHistory);
router.delete('/:id', deleteHistoryItem);

module.exports = router;

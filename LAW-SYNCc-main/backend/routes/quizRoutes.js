const express = require('express');
const router = express.Router();
const {
  getQuizzes,
  attemptQuiz,
  createQuiz,
  deleteQuiz
} = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

router.get('/', getQuizzes);
router.post('/attempt', attemptQuiz);
router.post('/', protect, adminOnly, createQuiz);
router.delete('/:id', protect, adminOnly, deleteQuiz);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getTerms,
  getTermById,
  getTermOfTheDay,
  getCategories,
  compareTerms,
  createTerm,
  updateTerm,
  deleteTerm
} = require('../controllers/termController');

const { protect, optionalAuth } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

// Specific static route paths must come before dynamic '/:id'
router.get('/term-of-day', getTermOfTheDay);
router.get('/categories', getCategories);
router.get('/compare', compareTerms);

// Main collection routes
router
  .route('/')
  .get(getTerms)
  .post(protect, adminOnly, createTerm);

// Single term routes
router
  .route('/:id')
  .get(optionalAuth, getTermById)
  .put(protect, adminOnly, updateTerm)
  .delete(protect, adminOnly, deleteTerm);

module.exports = router;

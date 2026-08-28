const History = require('../models/History');
const Term = require('../models/Term');

// @desc    Get user search and view history
// @route   GET /api/history
// @access  Private
const getHistory = async (req, res, next) => {
  try {
    const history = await History.find({ user: req.user._id })
      .populate('term')
      .sort({ searchedAt: -1 })
      .limit(50);

    const validHistory = history
      .filter((h) => h.term !== null)
      .map((h) => ({
        historyId: h._id,
        searchedAt: h.searchedAt,
        term: h.term
      }));

    res.status(200).json({
      success: true,
      count: validHistory.length,
      data: validHistory
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add or update history record for a term
// @route   POST /api/history/:termId
// @access  Private
const addHistory = async (req, res, next) => {
  try {
    const { termId } = req.params;

    const term = await Term.findById(termId);
    if (!term) {
      return res.status(404).json({
        success: false,
        message: 'Legal term not found'
      });
    }

    // Upsert or create entry to refresh timestamp
    const entry = await History.create({
      user: req.user._id,
      term: term._id,
      searchedAt: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'History recorded',
      data: entry
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a specific history entry
// @route   DELETE /api/history/:id
// @access  Private
const deleteHistoryItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const entry = await History.findOneAndDelete({
      _id: id,
      user: req.user._id
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'History record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'History item removed'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear all search and view history for current user
// @route   DELETE /api/history
// @access  Private
const clearHistory = async (req, res, next) => {
  try {
    await History.deleteMany({ user: req.user._id });

    res.status(200).json({
      success: true,
      message: 'All history cleared successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHistory,
  addHistory,
  deleteHistoryItem,
  clearHistory
};

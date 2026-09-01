const { History, Term } = require('../models');

// @desc    Get user search and view history
// @route   GET /api/history
// @access  Private
const getHistory = async (req, res, next) => {
  try {
    const history = await History.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Term,
          as: 'term'
        }
      ],
      order: [['searchedAt', 'DESC']],
      limit: 50
    });

    const validHistory = history
      .filter((h) => h.term !== null)
      .map((h) => ({
        historyId: h.id,
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

    const term = await Term.findByPk(termId);
    if (!term) {
      return res.status(404).json({
        success: false,
        message: 'Legal term not found'
      });
    }

    const entry = await History.create({
      userId: req.user.id,
      termId: term.id,
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

    const rowsDeleted = await History.destroy({
      where: {
        id: parseInt(id, 10),
        userId: req.user.id
      }
    });

    if (!rowsDeleted) {
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
    await History.destroy({
      where: { userId: req.user.id }
    });

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

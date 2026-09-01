const { Bookmark, Term } = require('../models');

// @desc    Get all bookmarked terms for current user
// @route   GET /api/bookmarks
// @access  Private
const getBookmarks = async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Term,
          as: 'term'
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const validBookmarks = bookmarks
      .filter((b) => b.term !== null)
      .map((b) => ({
        bookmarkId: b.id,
        savedAt: b.createdAt,
        term: b.term
      }));

    res.status(200).json({
      success: true,
      count: validBookmarks.length,
      data: validBookmarks
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add or toggle bookmark for a legal term
// @route   POST /api/bookmarks/:termId
// @access  Private
const addBookmark = async (req, res, next) => {
  try {
    const { termId } = req.params;

    // Verify term exists
    const term = await Term.findByPk(termId);
    if (!term) {
      return res.status(404).json({
        success: false,
        message: 'Legal term not found'
      });
    }

    const [bookmark, created] = await Bookmark.findOrCreate({
      where: {
        userId: req.user.id,
        termId: term.id
      }
    });

    res.status(created ? 201 : 200).json({
      success: true,
      isBookmarked: true,
      message: created ? 'Term bookmarked successfully' : 'Term is already bookmarked',
      data: bookmark
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove bookmark for a legal term
// @route   DELETE /api/bookmarks/:termId
// @access  Private
const removeBookmark = async (req, res, next) => {
  try {
    const { termId } = req.params;

    const rowsDeleted = await Bookmark.destroy({
      where: {
        userId: req.user.id,
        termId: parseInt(termId, 10)
      }
    });

    if (!rowsDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Bookmark not found for this term'
      });
    }

    res.status(200).json({
      success: true,
      isBookmarked: false,
      message: 'Bookmark removed successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Check if a term is bookmarked by current user
// @route   GET /api/bookmarks/check/:termId
// @access  Private
const checkBookmarkStatus = async (req, res, next) => {
  try {
    const { termId } = req.params;

    const bookmark = await Bookmark.findOne({
      where: {
        userId: req.user.id,
        termId: parseInt(termId, 10)
      }
    });

    res.status(200).json({
      success: true,
      isBookmarked: !!bookmark
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBookmarks,
  addBookmark,
  removeBookmark,
  checkBookmarkStatus
};

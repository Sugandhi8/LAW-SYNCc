const Bookmark = require('../models/Bookmark');
const Term = require('../models/Term');

// @desc    Get all bookmarked terms for current user
// @route   GET /api/bookmarks
// @access  Private
const getBookmarks = async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user._id })
      .populate('term')
      .sort({ createdAt: -1 });

    // Filter out bookmarks whose term might have been deleted
    const validBookmarks = bookmarks
      .filter((b) => b.term !== null)
      .map((b) => ({
        bookmarkId: b._id,
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
    const term = await Term.findById(termId);
    if (!term) {
      return res.status(404).json({
        success: false,
        message: 'Legal term not found'
      });
    }

    // Check if bookmark already exists
    const existingBookmark = await Bookmark.findOne({
      user: req.user._id,
      term: termId
    });

    if (existingBookmark) {
      return res.status(200).json({
        success: true,
        isBookmarked: true,
        message: 'Term is already bookmarked',
        data: existingBookmark
      });
    }

    const bookmark = await Bookmark.create({
      user: req.user._id,
      term: termId
    });

    res.status(201).json({
      success: true,
      isBookmarked: true,
      message: 'Term bookmarked successfully',
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

    const result = await Bookmark.findOneAndDelete({
      user: req.user._id,
      term: termId
    });

    if (!result) {
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
      user: req.user._id,
      term: termId
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

const User = require('../models/User');
const Bookmark = require('../models/Bookmark');
const History = require('../models/History');

// @desc    Get user profile with stats
// @route   GET /api/profile or GET /api/users/profile
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    const [bookmarksCount, historyCount, recentBookmarks, recentHistory] = await Promise.all([
      Bookmark.countDocuments({ user: user._id }),
      History.countDocuments({ user: user._id }),
      Bookmark.find({ user: user._id }).populate('term').sort({ createdAt: -1 }).limit(5),
      History.find({ user: user._id }).populate('term').sort({ searchedAt: -1 }).limit(5)
    ]);

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        stats: {
          bookmarksCount,
          historyCount
        },
        recentBookmarks: recentBookmarks.filter((b) => b.term !== null),
        recentHistory: recentHistory.filter((h) => h.term !== null)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile (name, email, password)
// @route   PUT /api/profile or PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    if (req.body.name) {
      user.name = req.body.name;
    }

    if (req.body.email) {
      const emailLower = req.body.email.toLowerCase();
      // Check if new email is taken by someone else
      if (emailLower !== user.email) {
        const existing = await User.findOne({ email: emailLower });
        if (existing) {
          return res.status(400).json({
            success: false,
            message: 'Email address is already in use'
          });
        }
        user.email = emailLower;
      }
    }

    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters long'
        });
      }
      user.password = req.body.password; // pre-save hook will hash it
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        updatedAt: updatedUser.updatedAt
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile
};

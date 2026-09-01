const { User, Bookmark, History, Term } = require('../models');

// @desc    Get user profile with stats
// @route   GET /api/profile or GET /api/users/profile
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    const [bookmarksCount, historyCount, recentBookmarks, recentHistory] = await Promise.all([
      Bookmark.count({ where: { userId: user.id } }),
      History.count({ where: { userId: user.id } }),
      Bookmark.findAll({
        where: { userId: user.id },
        include: [{ model: Term, as: 'term' }],
        order: [['createdAt', 'DESC']],
        limit: 5
      }),
      History.findAll({
        where: { userId: user.id },
        include: [{ model: Term, as: 'term' }],
        order: [['searchedAt', 'DESC']],
        limit: 5
      })
    ]);

    res.status(200).json({
      success: true,
      data: {
        id: user.id,
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
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    if (req.body.name) {
      user.name = req.body.name.trim();
    }

    if (req.body.email) {
      const emailLower = req.body.email.toLowerCase().trim();
      // Check if new email is taken by someone else
      if (emailLower !== user.email) {
        const existing = await User.findOne({ where: { email: emailLower } });
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
      user.password = req.body.password; // beforeSave hook will hash it
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        updatedAt: user.updatedAt
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

const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    term: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Term',
      required: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

// Prevent duplicate bookmarks for the same user and term
bookmarkSchema.index({ user: 1, term: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);

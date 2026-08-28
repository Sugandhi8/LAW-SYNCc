const mongoose = require('mongoose');

const historySchema = new mongoose.Schema(
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
      required: true
    },
    searchedAt: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  {
    timestamps: false
  }
);

// Index user and searchedAt for fast descending history queries
historySchema.index({ user: 1, searchedAt: -1 });

module.exports = mongoose.model('History', historySchema);

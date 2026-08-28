const mongoose = require('mongoose');

const termSchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: [true, 'Please provide the legal term word'],
      unique: true,
      trim: true,
      index: true
    },
    pronunciation: {
      type: String,
      trim: true,
      default: ''
    },
    category: {
      type: String,
      required: [true, 'Please provide a category for the term'],
      trim: true,
      index: true
    },
    categoryId: {
      type: String,
      trim: true,
      lowercase: true,
      default: function () {
        return this.category ? this.category.toLowerCase().replace(/[^a-z0-9]/g, '') : 'general';
      }
    },
    definition: {
      type: String,
      required: [true, 'Please provide a formal legal definition'],
      trim: true
    },
    simpleMeaning: {
      type: String,
      required: [true, 'Please provide a simplified plain-English meaning'],
      trim: true
    },
    example: {
      type: String,
      required: [true, 'Please provide a practical example or scenario'],
      trim: true
    },
    relatedLaws: {
      type: String,
      trim: true,
      default: ''
    },
    relatedTerms: {
      type: [String],
      default: []
    },
    keyElements: {
      type: [String],
      default: []
    },
    isPopular: {
      type: Boolean,
      default: false,
      index: true
    },
    isTermOfDay: {
      type: Boolean,
      default: false,
      index: true
    }
  },
  {
    timestamps: true
  }
);

// Text Index for full-text searching across word, definition, simpleMeaning, and category
termSchema.index({
  word: 'text',
  simpleMeaning: 'text',
  definition: 'text',
  category: 'text',
  relatedLaws: 'text'
});

module.exports = mongoose.model('Term', termSchema);

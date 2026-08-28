const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Please provide the quiz question'],
      trim: true
    },
    options: {
      type: [String],
      required: [true, 'Please provide answer options'],
      validate: {
        validator: function (val) {
          return val && val.length >= 2;
        },
        message: 'A quiz question must have at least 2 options'
      }
    },
    correctAnswer: {
      type: Number,
      required: [true, 'Please provide the index of the correct answer (0-indexed)'],
      min: 0
    },
    explanation: {
      type: String,
      required: [true, 'Please provide an explanation for the answer'],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Quiz', quizSchema);

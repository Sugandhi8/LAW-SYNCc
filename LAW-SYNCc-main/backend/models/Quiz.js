const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Quiz = sequelize.define(
  'Quiz',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide the quiz question' }
      }
    },
    options: {
      type: DataTypes.JSONB,
      allowNull: false,
      validate: {
        isValidOptions(val) {
          if (!Array.isArray(val) || val.length < 2) {
            throw new Error('A quiz question must have at least 2 options');
          }
        }
      }
    },
    correctAnswer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide an explanation' }
      }
    }
  },
  {
    tableName: 'quizzes',
    timestamps: true
  }
);

module.exports = Quiz;

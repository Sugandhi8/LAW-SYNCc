const { Op } = require('sequelize');
const { Quiz } = require('../models');

// @desc    Get all quiz questions
// @route   GET /api/quiz or GET /api/quizzes
// @access  Public
const getQuizzes = async (req, res, next) => {
  try {
    const questions = await Quiz.findAll({
      order: [['id', 'ASC']]
    });

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit a quiz attempt and calculate score with explanations
// @route   POST /api/quiz/attempt
// @access  Public (or Private)
const attemptQuiz = async (req, res, next) => {
  try {
    const { answers } = req.body; // Expects an array: [{ questionId: number|string, selectedOption: number }]

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of answers to evaluate'
      });
    }

    const questionIds = answers
      .map((a) => parseInt(a.questionId || a.quizId || a.id, 10))
      .filter((id) => !isNaN(id));

    const questions = await Quiz.findAll({
      where: {
        id: {
          [Op.in]: questionIds
        }
      }
    });

    const questionMap = new Map();
    questions.forEach((q) => questionMap.set(q.id, q));

    let score = 0;
    const results = answers.map((ans) => {
      const qId = parseInt(ans.questionId || ans.quizId || ans.id, 10);
      const q = questionMap.get(qId);
      if (!q) {
        return {
          questionId: qId,
          quizId: qId,
          error: 'Question not found'
        };
      }

      const selOpt = ans.selectedOption !== undefined ? ans.selectedOption : (ans.selectedAnswer !== undefined ? ans.selectedAnswer : -1);
      const isCorrect = q.correctAnswer === selOpt;
      if (isCorrect) score += 1;

      return {
        questionId: q.id,
        quizId: q.id,
        question: q.question,
        selectedOption: selOpt,
        selectedAnswer: selOpt,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation
      };
    });

    const totalQuestions = questions.length;
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

    res.status(200).json({
      success: true,
      score,
      total: totalQuestions,
      totalQuestions,
      percentage,
      passed: percentage >= 60,
      results
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new quiz question
// @route   POST /api/quiz
// @access  Private/Admin
const createQuiz = async (req, res, next) => {
  try {
    const { question, options, correctAnswer, explanation } = req.body;

    if (!question || !options || correctAnswer === undefined || !explanation) {
      return res.status(400).json({
        success: false,
        message: 'Please provide question, options (array), correctAnswer (0-indexed index), and explanation'
      });
    }

    const quiz = await Quiz.create({
      question,
      options,
      correctAnswer: parseInt(correctAnswer, 10),
      explanation
    });

    res.status(201).json({
      success: true,
      message: 'Quiz question created successfully',
      data: quiz
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a quiz question
// @route   DELETE /api/quiz/:id
// @access  Private/Admin
const deleteQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz question not found'
      });
    }

    await quiz.destroy();

    res.status(200).json({
      success: true,
      message: 'Quiz question deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getQuizzes,
  attemptQuiz,
  createQuiz,
  deleteQuiz
};

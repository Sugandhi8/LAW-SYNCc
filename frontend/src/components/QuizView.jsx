import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export default function QuizView() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);

  useEffect(() => {
    loadQuizzes();
  }, []);

  async function loadQuizzes() {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getQuizzes();
      if (res.success && res.data) {
        setQuizzes(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load quiz questions');
    } finally {
      setLoading(false);
    }
  }

  const handleSelectOption = (quizId, optionIndex) => {
    if (submitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [quizId]: optionIndex,
    });
  };

  const handleSubmitQuiz = async () => {
    const answersPayload = quizzes.map((q) => ({
      questionId: q.id,
      quizId: q.id,
      selectedOption: selectedAnswers[q.id] ?? -1,
      selectedAnswer: selectedAnswers[q.id] ?? -1,
    }));

    try {
      setLoading(true);
      const res = await api.submitQuizAttempt(answersPayload);
      if (res.success) {
        setScoreResult({
          score: res.score,
          total: res.total || res.totalQuestions || quizzes.length,
          percentage: res.percentage,
          results: res.results
        });
        setSubmitted(true);
      }
    } catch (err) {
      // If endpoint fails, calculate client-side
      let correct = 0;
      quizzes.forEach((q) => {
        if (selectedAnswers[q.id] === q.correctAnswer) correct++;
      });
      setScoreResult({
        score: correct,
        total: quizzes.length,
        percentage: Math.round((correct / quizzes.length) * 100),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScoreResult(null);
    setCurrentIndex(0);
  };

  if (loading && quizzes.length === 0) {
    return (
      <div className="quiz-loading-box">
        <div className="searching-spinner">Loading legal quiz questions from PostgreSQL...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-error-box">
        <AlertCircle size={24} />
        <p>{error}</p>
        <button type="button" className="btn-primary" onClick={loadQuizzes}>
          Retry
        </button>
      </div>
    );
  }

  if (!quizzes.length) {
    return (
      <div className="quiz-empty-box">
        <HelpCircle size={32} />
        <p>No quiz questions currently available in the database.</p>
      </div>
    );
  }

  const currentQuiz = quizzes[currentIndex];
  const isLastQuestion = currentIndex === quizzes.length - 1;
  const allAnswered = quizzes.every((q) => typeof selectedAnswers[q.id] !== 'undefined');

  return (
    <div className="quiz-view-page">
      <div className="section-intro">
        <h2 className="section-heading">Legal Knowledge Quiz</h2>
        <p className="section-subheading">
          Test your comprehension of criminal law, constitutional writs, torts, contract doctrines, and cyber jurisprudence.
        </p>
      </div>

      {/* Score Summary Modal/Card if submitted */}
      {submitted && scoreResult && (
        <div className="quiz-results-banner">
          <div className="results-trophy">
            <Award size={48} className="trophy-icon" />
          </div>
          <div className="results-info">
            <h3 className="results-title">Quiz Completed!</h3>
            <div className="results-score">
              Score: <strong>{scoreResult.score}</strong> / {scoreResult.total}{' '}
              <span className="results-pct">({scoreResult.percentage || Math.round((scoreResult.score / scoreResult.total) * 100)}%)</span>
            </div>
            <p className="results-message">
              {scoreResult.score === scoreResult.total
                ? '🌟 Outstanding! You scored 100% on the legal dictionary assessment.'
                : scoreResult.score >= scoreResult.total / 2
                ? '👍 Good job! Review the explanations below to master all doctrines.'
                : '📚 Keep practicing! Revisit definitions in the dictionary.'}
            </p>
          </div>
          <button type="button" className="quiz-restart-btn" onClick={handleReset}>
            <RotateCcw size={16} />
            <span>Retake Quiz</span>
          </button>
        </div>
      )}

      {/* Question Card */}
      <div className="quiz-card">
        <div className="quiz-card-header">
          <span className="quiz-step-badge">
            Question {currentIndex + 1} of {quizzes.length}
          </span>
          {currentQuiz.category && (
            <span className="quiz-category-tag">{currentQuiz.category}</span>
          )}
        </div>

        <h3 className="quiz-question-text">{currentQuiz.question}</h3>

        <div className="quiz-options-list">
          {currentQuiz.options.map((opt, idx) => {
            const isSelected = selectedAnswers[currentQuiz.id] === idx;
            let optionStateClass = '';

            if (submitted) {
              if (idx === currentQuiz.correctAnswer) {
                optionStateClass = 'correct-answer';
              } else if (isSelected && idx !== currentQuiz.correctAnswer) {
                optionStateClass = 'wrong-answer';
              }
            } else if (isSelected) {
              optionStateClass = 'selected-option';
            }

            return (
              <button
                key={idx}
                type="button"
                className={`quiz-option-btn ${optionStateClass}`}
                onClick={() => handleSelectOption(currentQuiz.id, idx)}
                disabled={submitted}
              >
                <div className="option-indicator">
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="option-text">{opt}</span>
                {submitted && idx === currentQuiz.correctAnswer && (
                  <CheckCircle2 size={18} className="option-feedback-icon text-success" />
                )}
                {submitted && isSelected && idx !== currentQuiz.correctAnswer && (
                  <XCircle size={18} className="option-feedback-icon text-danger" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation when submitted */}
        {submitted && currentQuiz.explanation && (
          <div className="quiz-explanation-box">
            <div className="explanation-title">
              <Sparkles size={16} /> Legal Rationale & Explanation:
            </div>
            <p className="explanation-text">{currentQuiz.explanation}</p>
          </div>
        )}

        {/* Navigation & Submit footer */}
        <div className="quiz-card-nav">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
          >
            Previous
          </button>

          <div className="quiz-pagination-dots">
            {quizzes.map((q, idx) => (
              <button
                key={q.id}
                type="button"
                className={`dot-btn ${idx === currentIndex ? 'active-dot' : ''} ${
                  typeof selectedAnswers[q.id] !== 'undefined' ? 'answered-dot' : ''
                }`}
                onClick={() => setCurrentIndex(idx)}
                title={`Go to Question ${idx + 1}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {isLastQuestion ? (
            !submitted ? (
              <button
                type="button"
                className="btn-primary submit-quiz-btn"
                onClick={handleSubmitQuiz}
              >
                Submit Answers
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary"
                onClick={handleReset}
              >
                Retake
              </button>
            )
          ) : (
            <button
              type="button"
              className="btn-primary"
              onClick={() => setCurrentIndex(Math.min(quizzes.length - 1, currentIndex + 1))}
            >
              <span>Next</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

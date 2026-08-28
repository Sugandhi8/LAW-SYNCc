import { useState } from 'react';
import { GraduationCap, CheckCircle2, XCircle, RotateCcw, ArrowRight, Award, Lightbulb } from 'lucide-react';
import { quizQuestions } from '../data/quizQuestions';

export default function Quiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = quizQuestions[currentIdx];
  const progressPercent = ((currentIdx + 1) / quizQuestions.length) * 100;

  const handleSelectOption = (index) => {
    if (selectedOption !== null) return; // Prevent changing after answer
    setSelectedOption(index);
    setShowExplanation(true);

    if (index === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setShowExplanation(false);
    setIsCompleted(false);
  };

  return (
    <div className="quiz-wrapper">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: '#d4af37', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          <GraduationCap size={18} />
          <span>Interactive Knowledge Assessment</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Legal Terminology Quiz
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          Test your comprehension of legal Latin, criminal procedure, constitutional rights, and civil doctrines.
        </p>
      </div>

      <div className="quiz-card">
        {!isCompleted ? (
          <>
            {/* Progress Bar */}
            <div className="quiz-progress-bar">
              <div className="quiz-progress-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span className="quiz-question-num">
                Question {currentIdx + 1} of {quizQuestions.length}
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#16a34a' }}>
                Score: {score}/{quizQuestions.length}
              </span>
            </div>

            <h2 className="quiz-question-text">{currentQ.question}</h2>

            {/* Options List */}
            <div className="quiz-options-list">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = currentQ.correctAnswer === idx;
                let optionStyle = "";

                if (selectedOption !== null) {
                  if (isCorrect) optionStyle = "correct";
                  else if (isSelected) optionStyle = "incorrect";
                } else if (isSelected) {
                  optionStyle = "selected";
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    className={`quiz-option-btn ${optionStyle}`}
                    onClick={() => handleSelectOption(idx)}
                    disabled={selectedOption !== null}
                  >
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: isSelected || (selectedOption !== null && isCorrect) ? 'transparent' : '#e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        flexShrink: 0
                      }}
                    >
                      {selectedOption !== null ? (
                        isCorrect ? <CheckCircle2 size={20} color="#16a34a" /> : (isSelected ? <XCircle size={20} color="#ef4444" /> : String.fromCharCode(65 + idx))
                      ) : (
                        String.fromCharCode(65 + idx)
                      )}
                    </div>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="quiz-explanation-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#1d4ed8', marginBottom: '0.35rem', fontSize: '0.92rem' }}>
                  <Lightbulb size={16} />
                  <span>Legal Explanation:</span>
                </div>
                <p style={{ fontSize: '0.94rem', color: '#1e293b', lineHeight: 1.55 }}>
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Next Button */}
            {selectedOption !== null && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button className="btn-primary" onClick={handleNextQuestion}>
                  <span>{currentIdx + 1 === quizQuestions.length ? "Finish & View Score" : "Next Question"}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </>
        ) : (
          /* Final Score Screen */
          <div className="quiz-score-screen">
            <div className="quiz-score-badge">
              <Award size={48} />
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Quiz Completed!
            </h2>

            <p style={{ fontSize: '1.2rem', color: '#475569', marginBottom: '1.5rem' }}>
              You scored <strong style={{ color: '#0f172a' }}>{score}</strong> out of <strong style={{ color: '#0f172a' }}>{quizQuestions.length}</strong> ({Math.round((score / quizQuestions.length) * 100)}%)
            </p>

            <div
              style={{
                background: score === quizQuestions.length ? '#f0fdf4' : (score >= quizQuestions.length / 2 ? '#eff6ff' : '#fef2f2'),
                border: `1px solid ${score === quizQuestions.length ? '#bbf7d0' : (score >= quizQuestions.length / 2 ? '#bfdbfe' : '#fecaca')}`,
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                maxWidth: '480px',
                margin: '0 auto 2rem',
                color: score === quizQuestions.length ? '#15803d' : (score >= quizQuestions.length / 2 ? '#1e40af' : '#b91c1c'),
                fontSize: '0.98rem',
                lineHeight: 1.5
              }}
            >
              {score === quizQuestions.length
                ? "🌟 Outstanding! You demonstrated exceptional mastery over fundamental legal definitions."
                : score >= quizQuestions.length / 2
                ? "👍 Good performance! You have a solid grasp of core legal terminologies."
                : "💡 Keep learning! Review the dictionary and study terms to reinforce your knowledge."}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button className="btn-gold" onClick={handleRestartQuiz}>
                <RotateCcw size={16} />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

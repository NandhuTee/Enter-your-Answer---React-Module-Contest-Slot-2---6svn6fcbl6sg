import React, { useState } from "react";
import "../styles/App.css";

const questions = [
  {
    question: "What is the capital of France?",
    answer: "Paris",
    score: 1
  },
  {
    question: "What is the largest country in the world?",
    answer: "Russia",
    score: 1
  },
  {
    question: "What is the currency of Japan?",
    answer: "Yen",
    score: 1
  },
  {
    question: "What is the tallest mammal?",
    answer: "Giraffe",
    score: 1
  },
  {
    question: "What is the chemical symbol for gold?",
    answer: "Au",
    score: 1
  }
];

function Quiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSubmit = () => {
    const currentQuestion = questions[questionIndex];
    if (answer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
      setScore(score + currentQuestion.score);
      setAnswer("");
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
        setAttempts(0); // Reset attempts when moving to the next question
      } else {
        setGameOver(true);
      }
    } else {
      setAttempts(attempts + 1);
      setAnswer("");
      if (attempts >= 2) {
        if (questionIndex < questions.length - 1) {
          setQuestionIndex(questionIndex + 1);
          setAttempts(0); // Reset attempts when moving to the next question
        } else {
          setGameOver(true);
        }
      }
    }
  };

  const handleRetryClick = () => {
    setQuestionIndex(0);
    setAnswer("");
    setAttempts(0);
    setGameOver(false);
    setScore(0);
  };

  if (gameOver) {
    return (
      <div className="game-over-container">
        <h1 className="game-over-heading">Game Over</h1>
        <p className="score-para">Your score: {score}/{questions.length}</p>
        <button className="retry-btn" onClick={handleRetryClick}>Retry</button>
      </div>
    );
  }

  const currentQuestion = questions[questionIndex];

  return (
    <div>
      <h1 className="question-text">{currentQuestion.question}</h1>
      <input
        className="answer-input"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      /><br />
      <button className="submit-btn" onClick={handleAnswerSubmit}>Submit</button>
      {attempts > 0 && (
        <p className="attempt-alert">
          {attempts === 1
            ? "Incorrect. Two attempts remaining."
            : attempts === 2
            ? "Incorrect. One attempt remaining."
            : ""}
        </p>
      )}
    </div>
  );
}

export default Quiz;

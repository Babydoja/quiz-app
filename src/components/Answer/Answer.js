import React from 'react';
import './answer.css';
import { GrNext, GrPrevious } from 'react-icons/gr';

const Answer = ({ quizQuestions, selectedOption }) => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => Math.min(prevQuestion + 1, quizQuestions.length - 1));
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prevQuestion) => Math.max(prevQuestion - 1, 0));
  };

  return (
    <div className="answer-container">
      <h1>Answer Page</h1>
      <div className="question">
        <h2>Question {currentQuestion + 1}</h2>
        <p>{quizQuestions[currentQuestion].question}</p>
        <div className="options">
          {quizQuestions[currentQuestion].options.map((option, optionIndex) => {
            const isSelected = selectedOption[currentQuestion]?.selectedOption === option;
            const isCorrectAnswer = option === quizQuestions[currentQuestion].answer;

            let optionClass = '';
            if (isSelected) {
              optionClass = isCorrectAnswer ? 'correct' : 'incorrect';
            }

            return (
              <div
                key={optionIndex}
                className={`option ${optionClass}`}
              >
                {option}
              </div>
            );
          })}
        </div>
        <div className="correct-answer">
          Correct Answer: {quizQuestions[currentQuestion].answer}
        </div>
      </div>
      <div className="buttons">
        <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
          <GrPrevious size={25} /> Previous
        </button>
        <button onClick={handleNextQuestion} disabled={currentQuestion === quizQuestions.length - 1}>
          Next <GrNext size={25} />
        </button>
      </div>
    </div>
  );
};

export default Answer;

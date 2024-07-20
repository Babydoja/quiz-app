import React, { useState, useEffect } from 'react';
import './MathQuiz.css';
import data from '../Data';
import { GrNext, GrPrevious } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';
import Countdowntimer from '../Countdowntimer';
import Calculator from '../calculator/Calculator';

const MathQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const mathQuestions = data.mathematics;

  useEffect(() => {
    // Randomize the order of options for each question
    mathQuestions.forEach((question) => {
      question.options.sort(() => Math.random() - 0.5);
    });

    // Randomize the order of the questions
    data.mathematics.sort(() => Math.random() - 0.5);
  }, []);

  const handleOptionSelect = (option) => {
    const currentQuestionData = mathQuestions[currentQuestion];
    const isCorrectAnswer = option === currentQuestionData.answer;

    // Check if the current question has been answered previously
    const hasAnsweredPreviously = answeredQuestions.includes(currentQuestion);

    if (!hasAnsweredPreviously) {
      // If the selected option is the correct answer, increment the score
      if (isCorrectAnswer) {
        setScore((prevScore) => prevScore + 1);
      }
      // Mark the current question as answered
      setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    } else {
      // If the current question has been answered previously
      if (isCorrectAnswer) {
        // If the selected option is the correct answer and it was previously answered wrongly, increment the score
        setScore((prevScore) => prevScore + 1);
      } else {
        // If the selected option is wrong, decrement the score
        setScore((prevScore) => Math.max(0, prevScore - 1));
      }
    }

    setSelectedOption(option);
    setTimeout(() => {
      handleNextQuestion();
    }, 200);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < mathQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption('');
    } else {
      setIsQuizFinished(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption('');
    }
  };

  const toggleShowAnswers = () => {
    setShowAnswers((prevState) => !prevState);
  };

  return (
    <div className="math-quiz">
      <div className="timer">
        <h1>Mathematics</h1>
        <Countdowntimer />
      </div>
      <Calculator />
      <div className="quiz-container">
        {isQuizFinished && !showAnswers ? (
          <div className="quiz-completion">
            <h2>Quiz completed</h2>
            <h2>Your final score: {score} / {mathQuestions.length}</h2>
            <div className='btnjoin'>
              <div>
                <button onClick={() => window.location.reload()} className='btn1'>
                  Attempt quiz again
                </button>
              </div>
              <div>
                <button onClick={toggleShowAnswers} className='btn2'>
                  {showAnswers ? 'Hide Answers' : 'Show Answers'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          !isQuizFinished && (
            <div className="question">
              <h2>Question {currentQuestion + 1}</h2>
              <p>{mathQuestions[currentQuestion].question}</p>
              <div className="options">
                {mathQuestions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    className={`option ${selectedOption === option ? 'selected' : ''}`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
              <div className="buttons">
                <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
                  Previous
                </button>
                <button onClick={handleNextQuestion}>
                  {currentQuestion === mathQuestions.length - 1 ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          )
        )}
      </div>
      <div className="score">
        {/* <p>Score: {score}</p> */}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<GrNext size={25} />}
        previousLabel={<GrPrevious size={25} />}
        pageCount={mathQuestions.length}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={(selected) => setCurrentQuestion(selected.selected)}
        forcePage={currentQuestion}
        renderOnZeroPageCount={null}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      {showAnswers && (
        <div className="answers-section">
          <h2>Correct Answers</h2>
          {mathQuestions.map((question, index) => (
            <div key={index} className="answer">
              <p><strong>Question {index + 1}:</strong> {question.question}</p>
              <p><strong>Answer:</strong> {question.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MathQuiz;

import React, { useState, useEffect } from 'react';
import './MathQuiz.css';
import data from '../Data';
import { GrNext, GrPrevious } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';
import Countdowntimer from '../Countdowntimer';
import Calculator from '../calculator/Calculator';
import Scoreboard from '../Scoreboard/Scoreboard';

const MathQuiz = ({ isQuiz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [finished, setFinished] = useState(false);

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
      setFinished(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption('');
    }
  };

  const handleTimeUp = () => {
    setTimeUp(true);
  };

  const handleFinishQuiz = () => {
    setFinished(true);
  };

  return (
    <>
      {isQuiz && (
        <div className="math-quiz">
          <div className="timer">
            <h1>Mathematics</h1>
            <Countdowntimer handleTimeUp={handleTimeUp} finished={finished} />
          </div>

          {!timeUp && !finished && (
            <>
              <div className='quemage'>
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
                <Calculator />
                <div className='image-container'></div>
              </div>

              <div className="score">
                <p>Score: {score}</p>
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
            </>
          )}

          {(timeUp || finished) && <Scoreboard score={score} totalQuestion={mathQuestions.length} />}
        </div>
      )}

      {!isQuiz && (
        <div className="answer-page">
          <h1>Answer Page</h1>
          {mathQuestions.map((question, index) => (
            <div key={index}>
              <p>Question {index + 1}</p>
              <p>Question: {question.question}</p>
              <p>Selected Option: {selectedOption}</p>
              <p>Correct Answer: {question.answer}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MathQuiz;

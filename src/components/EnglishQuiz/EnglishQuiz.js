import React, { useState, useEffect } from 'react';
import './EnglishQuiz.css';
import data from '../Data';
import { GrNext, GrPrevious } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';
import Countdowntimer from '../Countdowntimer';

const EnglishQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const englishQuestions = data.english;

  useEffect(() => {
    // Randomize the order of options only once on component mount
    englishQuestions.forEach((question) => {
      question.options = question.options.sort(() => Math.random() - 0.5);
    });
  }, []);

  const handleOptionSelect = (option) => {
    const currentQuestionData = englishQuestions[currentQuestion];
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
      if (isCorrectAnswer && selectedOption !== currentQuestionData.answer) {
        // If the selected option is the correct answer and it was previously answered wrongly, increment the score
        setScore((prevScore) => prevScore + 1);
      } else if (!isCorrectAnswer && selectedOption === currentQuestionData.answer) {
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
    if (currentQuestion < englishQuestions.length - 1) {
      setSelectedOption('');
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setSelectedOption('');
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const toggleShowAnswers = () => {
    setShowAnswers((prevState) => !prevState);
  };

  const handleTimeUp = () => {
    setIsQuizFinished(true);
  };

  return (
    <div className="english-quiz">
      <div className='timer'>
        <h1>Current Affairs</h1>
        <Countdowntimer isQuizFinished={isQuizFinished} handleTimeUp={handleTimeUp} />
      </div>
      <div className='quemage'>
        {isQuizFinished ? (
          <div className="quiz-completion">
            <h2>Quiz Completed!</h2>
            <p>Score is: {score}/{englishQuestions.length}</p>
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
          <div className="question">
            <h2>Question {currentQuestion + 1}</h2>
            <p>{englishQuestions[currentQuestion].question}</p>
            <div className="options">
              {englishQuestions[currentQuestion].options.map((option, index) => (
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
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              <button onClick={handleNextQuestion}>
                {currentQuestion === englishQuestions.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        )}
        <div className='image-container'></div>
      </div>
      {!isQuizFinished && !showAnswers && (
        <div className="score">
          {/* <p>Score: {score}</p> */}
        </div>
      )}
      {!isQuizFinished && (
        <ReactPaginate
          breakLabel="..."
          nextLabel={<GrNext size={25} />}
          previousLabel={<GrPrevious size={25} />}
          pageCount={englishQuestions.length}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={(selected) => setCurrentQuestion(selected.selected)}
          forcePage={currentQuestion}
          renderOnZeroPageCount={null}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      )}
      {showAnswers && (
        <div className="answers-section">
          <h2>Correct Answers</h2>
          {englishQuestions.map((question, index) => (
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
export default EnglishQuiz;

import React, { useState, useEffect } from 'react';
import './CrsQuiz.css';
import data from '../Data';
import { GrNext, GrPrevious } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';
import Countdowntimer from '../Countdowntimer';

const CrsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const crsQuestions = data.crs;

  useEffect(() => {
    // Randomize the order of options for each question
    crsQuestions.forEach((question) => {
      question.options.sort(() => Math.random() - 0.5);
    });
  }, []);

  const handleOptionSelect = (option) => {
    const currentQuestionData = crsQuestions[currentQuestion];
    const isCorrectAnswer = option === currentQuestionData.answer;

    const hasAnsweredPreviously = answeredQuestions.includes(currentQuestion);

    if (!hasAnsweredPreviously) {
      if (isCorrectAnswer) {
        setScore((prevScore) => prevScore + 1);
      }
      setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    } else {
      if (isCorrectAnswer) {
        setScore((prevScore) => prevScore + 1);
      } else {
        setScore((prevScore) => Math.max(0, prevScore - 1));
      }
    }

    setSelectedOption(option);
    setUserAnswers({ ...userAnswers, [currentQuestion]: option });

    setTimeout(() => {
      handleNextQuestion();
    }, 200);
  };

  const handleNextQuestion = () => {
    setSelectedOption('');
    if (currentQuestion < crsQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handlePreviousQuestion = () => {
    setSelectedOption('');
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const toggleShowAnswers = () => {
    setShowAnswers((prevState) => !prevState);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption('');
    setScore(0);
    setAnsweredQuestions([]);
    setUserAnswers({});
    setIsQuizFinished(false);
    setShowAnswers(false);
  };

  return (
    <div className="crs-quiz">
      <div className='timer'>
        <h1>English</h1>
        <Countdowntimer finished={isQuizFinished} />
      </div>
      <div className="quiz-container">
        {isQuizFinished ? (
          <div className="quiz-completion">
            <h2>Quiz completed</h2>
            <h2>Your final score: {score} / {crsQuestions.length}</h2>
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
            <p>{crsQuestions[currentQuestion].question}</p>
            <div className="options">
              {crsQuestions[currentQuestion].options.map((option, index) => (
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
                {currentQuestion === crsQuestions.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<GrNext size={25} />}
        previousLabel={<GrPrevious size={25} />}
        pageCount={crsQuestions.length}
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
          {crsQuestions.map((question, index) => (
            <div key={index} className="answer">
              <p><strong>Question {index + 1}:</strong> {question.question}</p>
              <p><strong>Answer:</strong> {question.answer}</p>
              {/* <p><strong>Your Answer:</strong> {userAnswers[index]}</p> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CrsQuiz;

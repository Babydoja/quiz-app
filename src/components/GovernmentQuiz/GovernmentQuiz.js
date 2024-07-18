import React, { useState, useEffect } from 'react';
import './GovernmentQuiz.css';
import data from '../Data';
import {GrNext} from 'react-icons/gr'
import {GrPrevious} from 'react-icons/gr'
import ReactPaginate from 'react-paginate';
import Countdowntimer from '../Countdowntimer';
import Scoreboard from '../Scoreboard/Scoreboard';


const GovernmentQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [timeUp, setTimeUp] = useState(false);
  const [finished, setFinished] = useState(false);


  const governmentQuestions = data.government;

  useEffect(() => {
    // Randomize the order of options for each question
    governmentQuestions.forEach((question) => {
      question.options.sort(() => Math.random() - 0.5);
    });
  }, []);

  const handleOptionSelect = (option) => {
    const currentQuestionData = governmentQuestions[currentQuestion];
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
    setSelectedOption('');
    setCurrentQuestion(currentQuestion + 1);
    setCurrentQuestion(currentQuestion + 1);
    if (currentQuestion === governmentQuestions.length - 1) {
      // Last question, mark the quiz as finished
      setFinished(true);
      
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  

  const handlePreviousQuestion = () => {
    setSelectedOption('');
    setCurrentQuestion(currentQuestion - 1);
  };
   // Function to handle when the time is up
   const handleTimeUp = () => {
    setTimeUp(true);
  };

  // Function to handle when the user clicks on "Finish"
  const handleFinishQuiz = () => {
    setFinished(true);
  };

  return (
    <div className="government-quiz">
       <div className='timer'>
      <h1>Government</h1>
      <Countdowntimer handleTimeUp={handleTimeUp} finished={finished} />
      </div>
      {!timeUp && !finished && (
      <>
      <div className='quemage'>
      <div className="question">
        <h2>Question {currentQuestion + 1}</h2>
        <p>{governmentQuestions[currentQuestion].question}</p>
        <div className="options">
          {governmentQuestions[currentQuestion].options.map((option, index) => (
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
            {currentQuestion === governmentQuestions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
      
      <div className='image-container'>
 
</div>
      </div>
      <div className="score">
        <p>Score: {score}</p>
      </div>
      </>
        )}
        {(timeUp || finished) && <Scoreboard score={score}  totalQuestion ={governmentQuestions.length}/>}
       {!timeUp && !finished && (
        <>
      <ReactPaginate
      breakLabel="..."
      nextLabel={<GrNext size={25}/>}
      previousLabel={<GrPrevious size={25}/>}
  pageCount={governmentQuestions.length}
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
    </div>
  );
};

export default GovernmentQuiz;

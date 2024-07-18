import React, { useState, useEffect } from 'react';
import './ChemistryQuiz.css';
import data from '../Data';
import {GrNext} from 'react-icons/gr'
import {GrPrevious} from 'react-icons/gr'
import ReactPaginate from 'react-paginate';
import Countdowntimer from '../Countdowntimer';
import Calculator from '../calculator/Calculator';
<<<<<<< HEAD
=======
import Scoreboard from '../Scoreboard/Scoreboard';


>>>>>>> 0219c00903cd454be62c341e78861fc9c808a543

const ChemistryQuiz = ({isQuiz}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState({});
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [timeUp, setTimeUp] = useState(false);
  const [finished, setFinished] = useState(false);
  


  const chemistryQuestions = data.chemistry;

  useEffect(() => {
    // Randomize the order of options for each question
    chemistryQuestions.forEach((question) => {
      question.options.sort(() => Math.random() - 0.5);
    });
    chemistryQuestions.forEach((question) => {
      data.chemistry.sort(() => Math.random() - 0.5);
    });
    
    
  
  }, []);
 
  const handleOptionSelect = (option) => {
    const currentQuestionData = chemistryQuestions[currentQuestion];
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
  
    const selectedOptionInfo = {
      questionIndex: currentQuestion,
      selectedOption: option,
      correctOption: currentQuestionData.answer,
    };
    setSelectedOption(selectedOptionInfo);
  
    setTimeout(() => {
      handleNextQuestion();
    }, 200);
  };

  const handleNextQuestion = () => {
    if (selectedOption === chemistryQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }

    setSelectedOption('');
    
    setCurrentQuestion(currentQuestion + 1);
    if (currentQuestion === chemistryQuestions.length - 1) {
      // Last question, mark the quiz as finished
      setFinished(true);
      
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    setSelectedOption({});
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
    <>
    {isQuiz && (
    <div className="chemistry-quiz">
      
      <div className='timer'>
      <h1>Chemistry</h1>
      <Countdowntimer handleTimeUp={handleTimeUp} finished={finished} />
      </div>
      
      {!timeUp && !finished && (
      <>
      <div className='quemage'>
      <div className="question">
        <h2>Question {currentQuestion + 1}</h2>
        <p>{chemistryQuestions[currentQuestion].question}</p>
        <div className="options">
          {chemistryQuestions[currentQuestion].options.map((option, index) => (
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
            {currentQuestion === chemistryQuestions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
       
      </div>
      <Calculator/>

      <div className='image-container'>
         
      </div>
      </div>
      <div className="score">
        <p>Score: {score}</p>
      </div>
      </>
      )}
      
     
     
      {(timeUp || finished) && <Scoreboard score={score}  totalQuestion ={chemistryQuestions.length}/>}
       {!timeUp && !finished && (
        <>
        <ReactPaginate
        breakLabel="..."
        nextLabel={<GrNext size={25}/>}
        previousLabel={<GrPrevious size={25}/>}
    pageCount={chemistryQuestions.length}
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
      )}

    

     
{!isQuiz && (
        <div className="answer-page">
          {/* Your code for displaying answers goes here */}
          <h1>Answer Page</h1>
          {/* For each question, map through chemistryQuestions and display the question, selected option, and correct answer */}
          {chemistryQuestions.map((question, index) => (
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

export default ChemistryQuiz;

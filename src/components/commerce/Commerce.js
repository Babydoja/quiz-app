import React from 'react'
import { Link } from 'react-router-dom';

const Commerce = () => {
  const startQuiz = () => {
    // Redirect to the quiz page
    window.location.href = "/commercequiz";
  };

  return (
    <div className="instructions-container" style={{ maxHeight: "100vh", overflowY: "auto" }}>
       <h1>INSTRUCTIONS FOR CBT EXAMINATION</h1>

       <ol> 
      <li>
        <h2>Test Format:</h2>
        <ul>
          <li>This exam consists of multiple-choice questions.</li>
          <li>Each question will have four answer options, labeled A, B, C, and D.</li>
          <li>Select the correct answer by clicking on the respective option.</li>
        </ul>
      </li>
      
      <li>
        <h2>Question Navigation:</h2>
        <ul>
          <li>You can navigate between questions by using the navigation buttons provided.</li>
          <li>You can move forward or backward through the questions at any time during the exam.</li>
          <li>Review your answers before final submission.</li>
        </ul>
      </li>
      
      <li>
        <h2>Marking Scheme:</h2>
        <ul>
          <li>Each correct answer carries 1 mark.</li>
          <li>There are no negative marks for incorrect answers or unanswered questions.</li>
          <li>Make sure to attempt all questions as there is no penalty for guessing.</li>
        </ul>
      </li>
      
      <li>
        <h2>Submitting Answers:</h2>
        <ul>
          <li>After selecting your answer, click the "Next" button to save your response and proceed to the next question.</li>
          <li>Ensure that you have answered all the questions before the exam time expires.</li>
          <li>The system will automatically submit your answers once the time is up.</li>
        </ul>
      </li> 
    </ol>

<p>Best of luck for your exam!</p>
<Link to="/commercequiz">
          <button onClick={startQuiz} className='start-btn --btn --btn-primary'>Start</button>
        </Link>
    </div>
  );
}

export default Commerce
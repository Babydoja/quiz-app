import React from 'react';
import './scoreboard.css';
import { Link } from 'react-router-dom';





const Scoreboard = ({score, totalQuestion}) => {
  
  return (
    <div className='scoreboard'>
      <h2>YOUR SCORE IS</h2>
      <h3 className='scoree'>{score}/{totalQuestion}</h3>
      <Link to='/email' className='check-answer'>
        <button className='--btn --btn-primary --btn-block'>Check Answers</button>
      </Link>
    </div>
  );
};

export default Scoreboard;

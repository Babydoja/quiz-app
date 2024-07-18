import React, { useState, useEffect } from 'react';
import './Calculator.css';
import {FcCalculator} from 'react-icons/fc'

const Calculator = () => {
  const [isCalculatorVisible, setIsCalculatorVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  

  const handleCalculatorClick = () => {
    setIsCalculatorVisible(!isCalculatorVisible);
  };

 
  
  const handleDigitClick = (digit) => {
    if (displayValue === '0' || waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue + digit);
    }
  };

  const handleDecimalClick = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const handleOperatorClick = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplayValue(result);
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = () => {
    const inputValue = parseFloat(displayValue);

    if (operator === '+') {
      return firstOperand + inputValue;
    } else if (operator === '-') {
      return firstOperand - inputValue;
    } else if (operator === '*') {
      return firstOperand * inputValue;
    } else if (operator === '/') {
      return firstOperand / inputValue;
    }

    return inputValue;
  };

  const handleEqualsClick = () => {
    if (!operator) return;

    const result = performCalculation();
    setDisplayValue(result);
    setFirstOperand(result);
    setOperator(null);
    setWaitingForSecondOperand(true);
  };

  const handleClearClick = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

    return (
    <div className="calculator-wrapper">
      <div className="calculator-icon" onClick={handleCalculatorClick}>
        <FcCalculator size={30}/>
      </div>
      {isCalculatorVisible && (
        <div className="calculator">
          <div className="calculator-display">{displayValue}</div>
          <div className="calculator-buttons">
            <button onClick={() => handleDigitClick('7')}>7</button>
            <button onClick={() => handleDigitClick('8')}>8</button>
            <button onClick={() => handleDigitClick('9')}>9</button>
            <button onClick={() => handleOperatorClick('/')}>/</button>
            <button onClick={() => handleDigitClick('4')}>4</button>
            <button onClick={() => handleDigitClick('5')}>5</button>
            <button onClick={() => handleDigitClick('6')}>6</button>
            <button onClick={() => handleOperatorClick('*')}>*</button>
            <button onClick={() => handleDigitClick('1')}>1</button>
            <button onClick={() => handleDigitClick('2')}>2</button>
            <button onClick={() => handleDigitClick('3')}>3</button>
            <button onClick={() => handleOperatorClick('-')}>-</button>
            <button onClick={() => handleDigitClick('0')}>0</button>
            <button onClick={handleDecimalClick}>.</button>
            <button onClick={handleEqualsClick}>=</button>
            <button onClick={() => handleOperatorClick('+')}>+</button>
            <button onClick={handleClearClick}>C</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;

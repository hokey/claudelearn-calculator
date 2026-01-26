import React, { useEffect, useCallback } from 'react';
import { Display } from './Display';
import { ButtonGrid } from './ButtonGrid';
import { useCalculator } from '../../hooks/useCalculator';
import './Calculator.css';

export const Calculator: React.FC = () => {
  const {
    display,
    history,
    error,
    operation,
    inputDigit,
    setOperation,
    calculate,
    clear,
    allClear,
    percent,
    sqrt,
    pow,
    inputDecimal,
  } = useCalculator();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;

      if (key >= '0' && key <= '9') {
        inputDigit(key);
      } else if (key === '.') {
        inputDecimal();
      } else if (key === '+') {
        setOperation('add');
      } else if (key === '-') {
        setOperation('subtract');
      } else if (key === '*') {
        setOperation('multiply');
      } else if (key === '/') {
        event.preventDefault();
        setOperation('divide');
      } else if (key === '%') {
        percent();
      } else if (key === '^') {
        pow();
      } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
      } else if (key === 'Escape') {
        allClear();
      } else if (key === 'Backspace') {
        clear();
      }
    },
    [inputDigit, inputDecimal, setOperation, percent, pow, calculate, allClear, clear]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="calculator" role="application" aria-label="Calculator">
      <div className={error ? 'calc-display--error' : ''}>
        <Display value={display} history={history} error={error} />
      </div>
      <ButtonGrid
        onDigit={inputDigit}
        onOperation={setOperation}
        onEquals={calculate}
        onClear={clear}
        onAllClear={allClear}
        onPercent={percent}
        onSqrt={sqrt}
        onPow={pow}
        onDecimal={inputDecimal}
        activeOperation={operation}
      />
    </div>
  );
};

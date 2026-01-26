import { useState, useCallback } from 'react';
import { calculate as apiCalculate, type Operation } from '../services/api';

export function useCalculator() {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState('');
  const [error, setError] = useState(false);
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setCurrentOperation] = useState<Operation | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = useCallback((digit: string) => {
    setError(false);
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay((prev) => (prev === '0' ? digit : prev + digit));
    }
  }, [waitingForOperand]);

  const inputDecimal = useCallback(() => {
    setError(false);
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay((prev) => prev + '.');
    }
  }, [waitingForOperand, display]);

  const clear = useCallback(() => {
    setDisplay('0');
    setError(false);
  }, []);

  const allClear = useCallback(() => {
    setDisplay('0');
    setHistory('');
    setPreviousValue(null);
    setCurrentOperation(null);
    setWaitingForOperand(false);
    setError(false);
  }, []);

  const setOperation = useCallback(
    async (op: Operation) => {
      const currentValue = parseFloat(display);

      if (previousValue !== null && operation && !waitingForOperand) {
        const response = await apiCalculate(operation, [previousValue, currentValue]);

        if (response.error) {
          setDisplay('Error');
          setHistory(response.message || 'Error');
          setError(true);
          setPreviousValue(null);
          setCurrentOperation(null);
          setWaitingForOperand(true);
          return;
        }

        const result = response.result!;
        setDisplay(String(result));
        setPreviousValue(result);
        setHistory(`${result} ${getOperationSymbol(op)}`);
      } else {
        setPreviousValue(currentValue);
        setHistory(`${currentValue} ${getOperationSymbol(op)}`);
      }

      setCurrentOperation(op);
      setWaitingForOperand(true);
      setError(false);
    },
    [display, previousValue, operation, waitingForOperand]
  );

  const calculate = useCallback(async () => {
    if (previousValue === null || operation === null) {
      return;
    }

    const currentValue = parseFloat(display);
    const response = await apiCalculate(operation, [previousValue, currentValue]);

    if (response.error) {
      setDisplay('Error');
      setHistory(response.message || 'Error');
      setError(true);
      setPreviousValue(null);
      setCurrentOperation(null);
      setWaitingForOperand(true);
      return;
    }

    const result = response.result!;
    setHistory(`${previousValue} ${getOperationSymbol(operation)} ${currentValue} =`);
    setDisplay(String(result));
    setPreviousValue(null);
    setCurrentOperation(null);
    setWaitingForOperand(true);
    setError(false);
  }, [display, previousValue, operation]);

  const percent = useCallback(() => {
    const currentValue = parseFloat(display);
    const result = currentValue / 100;
    setDisplay(String(result));
    setHistory(`${currentValue}%`);
    setError(false);
  }, [display]);

  const sqrt = useCallback(async () => {
    const currentValue = parseFloat(display);
    const response = await apiCalculate('sqrt', [currentValue]);

    if (response.error) {
      setDisplay('Error');
      setHistory(response.message || 'Error');
      setError(true);
      return;
    }

    setDisplay(String(response.result!));
    setHistory(`sqrt(${currentValue})`);
    setWaitingForOperand(true);
    setError(false);
  }, [display]);

  const pow = useCallback(() => {
    setOperation('pow');
  }, [setOperation]);

  return {
    display,
    history,
    error,
    operation,
    inputDigit,
    inputDecimal,
    clear,
    allClear,
    setOperation,
    calculate,
    percent,
    sqrt,
    pow,
  };
}

function getOperationSymbol(op: Operation): string {
  switch (op) {
    case 'add':
      return '+';
    case 'subtract':
      return '-';
    case 'multiply':
      return '*';
    case 'divide':
      return '/';
    case 'pow':
      return '^';
    case 'mod':
      return '%';
    default:
      return '';
  }
}

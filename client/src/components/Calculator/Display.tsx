import React from 'react';

interface DisplayProps {
  value: string;
  history: string;
  error?: boolean;
}

export const Display: React.FC<DisplayProps> = ({ value, history, error = false }) => {
  return (
    <div className="calc-display">
      <div
        className="calc-display__history"
        aria-label="Calculation history"
      >
        {history}
      </div>
      <div
        className="calc-display__value"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        aria-label={error ? "Error" : "Display value"}
      >
        {value}
      </div>
    </div>
  );
};

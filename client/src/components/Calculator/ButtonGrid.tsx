import React from 'react';
import { Button } from './Button';
import type { Operation } from '../../services/api';

interface ButtonGridProps {
  onDigit: (digit: string) => void;
  onOperation: (op: Operation) => void;
  onEquals: () => void;
  onClear: () => void;
  onAllClear: () => void;
  onPercent: () => void;
  onSqrt: () => void;
  onPow: () => void;
  onDecimal: () => void;
  activeOperation?: Operation | null;
}

export const ButtonGrid: React.FC<ButtonGridProps> = ({
  onDigit,
  onOperation,
  onEquals,
  onClear,
  onAllClear,
  onPercent,
  onSqrt,
  onPow,
  onDecimal,
  activeOperation,
}) => {
  return (
    <div className="calc-button-grid" role="group" aria-label="Calculator buttons">
      {/* Row 1 */}
      <Button label="AC" onClick={onAllClear} variant="function" ariaLabel="All clear" />
      <Button label="C" onClick={onClear} variant="function" ariaLabel="Clear" />
      <Button label="%" onClick={onPercent} variant="function" ariaLabel="Percent" />
      <Button
        label="÷"
        onClick={() => onOperation('divide')}
        variant="operation"
        ariaLabel="Divide"
        active={activeOperation === 'divide'}
      />
      <Button label="√" onClick={onSqrt} variant="operation" ariaLabel="Square root" />

      {/* Row 2 */}
      <Button label="7" onClick={() => onDigit('7')} ariaLabel="Seven" />
      <Button label="8" onClick={() => onDigit('8')} ariaLabel="Eight" />
      <Button label="9" onClick={() => onDigit('9')} ariaLabel="Nine" />
      <Button
        label="×"
        onClick={() => onOperation('multiply')}
        variant="operation"
        ariaLabel="Multiply"
        active={activeOperation === 'multiply'}
      />
      <Button
        label="^"
        onClick={onPow}
        variant="operation"
        ariaLabel="Power"
        active={activeOperation === 'pow'}
      />

      {/* Row 3 */}
      <Button label="4" onClick={() => onDigit('4')} ariaLabel="Four" />
      <Button label="5" onClick={() => onDigit('5')} ariaLabel="Five" />
      <Button label="6" onClick={() => onDigit('6')} ariaLabel="Six" />
      <Button
        label="−"
        onClick={() => onOperation('subtract')}
        variant="operation"
        ariaLabel="Subtract"
        active={activeOperation === 'subtract'}
      />
      <div className="calc-button-placeholder" aria-hidden="true" />

      {/* Row 4 */}
      <Button label="1" onClick={() => onDigit('1')} ariaLabel="One" />
      <Button label="2" onClick={() => onDigit('2')} ariaLabel="Two" />
      <Button label="3" onClick={() => onDigit('3')} ariaLabel="Three" />
      <Button
        label="+"
        onClick={() => onOperation('add')}
        variant="operation"
        ariaLabel="Add"
        active={activeOperation === 'add'}
      />
      <div className="calc-button-placeholder" aria-hidden="true" />

      {/* Row 5 */}
      <Button label="0" onClick={() => onDigit('0')} span={2} ariaLabel="Zero" />
      <Button label="." onClick={onDecimal} ariaLabel="Decimal point" />
      <Button label="=" onClick={onEquals} variant="equals" span={2} ariaLabel="Equals" />
    </div>
  );
};

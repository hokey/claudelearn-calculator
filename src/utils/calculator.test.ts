import { Calculator } from './calculator';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    it('should handle negative numbers', () => {
      expect(calculator.add(-2, 3)).toBe(1);
    });
  });

  describe('subtract', () => {
    it('should subtract two numbers', () => {
      expect(calculator.subtract(5, 3)).toBe(2);
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers', () => {
      expect(calculator.multiply(4, 5)).toBe(20);
    });
  });

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(calculator.divide(10, 2)).toBe(5);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => calculator.divide(10, 0)).toThrow('Division by zero is not allowed');
    });
  });

  describe('sqrt', () => {
    it('should calculate square root of positive numbers', () => {
      expect(calculator.sqrt(9)).toBe(3);
      expect(calculator.sqrt(16)).toBe(4);
      expect(calculator.sqrt(2)).toBeCloseTo(1.414, 3);
    });

    it('should handle zero', () => {
      expect(calculator.sqrt(0)).toBe(0);
    });

    it('should throw error for negative numbers', () => {
      expect(() => calculator.sqrt(-1)).toThrow('Cannot calculate square root of negative number');
    });
  });

  describe('pow', () => {
    it('should calculate power of positive numbers', () => {
      expect(calculator.pow(2, 3)).toBe(8);
      expect(calculator.pow(5, 2)).toBe(25);
    });

    it('should handle negative exponents', () => {
      expect(calculator.pow(2, -1)).toBe(0.5);
      expect(calculator.pow(10, -2)).toBe(0.01);
    });

    it('should handle zero exponent', () => {
      expect(calculator.pow(5, 0)).toBe(1);
    });

    it('should handle fractional exponents', () => {
      expect(calculator.pow(4, 0.5)).toBe(2);
      expect(calculator.pow(27, 1/3)).toBeCloseTo(3, 10);
    });
  });

  describe('mod', () => {
    it('should return remainder of division', () => {
      expect(calculator.mod(10, 3)).toBe(1);
      expect(calculator.mod(20, 7)).toBe(6);
    });

    it('should handle negative numbers', () => {
      expect(calculator.mod(-10, 3)).toBe(-1);
      expect(calculator.mod(10, -3)).toBe(1);
    });

    it('should throw error when mod by zero', () => {
      expect(() => calculator.mod(10, 0)).toThrow('Mod by zero is not allowed');
    });
  });
});

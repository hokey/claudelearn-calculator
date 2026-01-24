/**
 * A simple calculator utility for demonstration purposes
 */
export class Calculator {
  /**
   * Adds two numbers together
   */
  add(a: number, b: number): number {
    return a + b;
  }

  /**
   * Subtracts b from a
   */
  subtract(a: number, b: number): number {
    return a - b;
  }

  /**
   * Multiplies two numbers
   */
  multiply(a: number, b: number): number {
    return a * b;
  }

  /**
   * Divides a by b
   * @throws Error if b is zero
   */
  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  }

  /**
   * Calculates the square root of a number
   * @throws Error if a is negative
   */
  sqrt(a: number): number {
    if (a < 0) {
      throw new Error('Cannot calculate square root of negative number');
    }
    return Math.sqrt(a);
  }

  /**
   * Raises base to the power of exponent (base^exponent)
   */
  pow(base: number, exponent: number): number {
    return Math.pow(base, exponent);
  }

  /**
   * Returns the remainder of a divided by b
   * @throws Error if b is zero
   */
  mod(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Mod by zero is not allowed');
    }
    return a % b;
  }
}

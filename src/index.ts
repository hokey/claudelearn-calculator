import * as readline from 'readline';
import { Calculator } from './utils/calculator';

/**
 * Main entry point for the application
 */
function main(): void {
  console.log('Welcome to ClaudeLearn Calculator!');
  console.log('Available operations: add, subtract, multiply, divide, sqrt, pow, mod');
  console.log('Type "exit" to quit\n');

  const calc = new Calculator();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const promptUser = (): void => {
    rl.question('Enter operation (e.g., "add 5 3" or "sqrt 16"): ', (input) => {
      const trimmedInput = input.trim();

      if (trimmedInput.toLowerCase() === 'exit') {
        console.log('Goodbye!');
        rl.close();
        return;
      }

      try {
        const result = performCalculation(calc, trimmedInput);
        console.log(`Result: ${result}\n`);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error: ${error.message}\n`);
        } else {
          console.error('An unknown error occurred\n');
        }
      }

      promptUser();
    });
  };

  promptUser();
}

/**
 * Performs a calculation based on user input
 */
function performCalculation(calc: Calculator, input: string): number {
  const parts = input.split(' ').filter(part => part.length > 0);

  if (parts.length === 0) {
    throw new Error('No operation provided');
  }

  const operation = parts[0].toLowerCase();

  switch (operation) {
    case 'add':
      if (parts.length !== 3) {
        throw new Error('Add requires two numbers: add <num1> <num2>');
      }
      return calc.add(parseNumber(parts[1]), parseNumber(parts[2]));

    case 'subtract':
      if (parts.length !== 3) {
        throw new Error('Subtract requires two numbers: subtract <num1> <num2>');
      }
      return calc.subtract(parseNumber(parts[1]), parseNumber(parts[2]));

    case 'multiply':
      if (parts.length !== 3) {
        throw new Error('Multiply requires two numbers: multiply <num1> <num2>');
      }
      return calc.multiply(parseNumber(parts[1]), parseNumber(parts[2]));

    case 'divide':
      if (parts.length !== 3) {
        throw new Error('Divide requires two numbers: divide <num1> <num2>');
      }
      return calc.divide(parseNumber(parts[1]), parseNumber(parts[2]));

    case 'sqrt':
      if (parts.length !== 2) {
        throw new Error('Square root requires one number: sqrt <num>');
      }
      return calc.sqrt(parseNumber(parts[1]));

    case 'pow':
      if (parts.length !== 3) {
        throw new Error('Power requires two numbers: pow <base> <exponent>');
      }
      return calc.pow(parseNumber(parts[1]), parseNumber(parts[2]));

    case 'mod':
      if (parts.length !== 3) {
        throw new Error('Mod requires two numbers: mod <num1> <num2>');
      }
      return calc.mod(parseNumber(parts[1]), parseNumber(parts[2]));

    default:
      throw new Error(`Unknown operation: ${operation}. Available: add, subtract, multiply, divide, sqrt, pow, mod`);
  }
}

/**
 * Parses a string to a number with validation
 */
function parseNumber(value: string): number {
  const num = Number(value);
  if (isNaN(num)) {
    throw new Error(`Invalid number: ${value}`);
  }
  return num;
}

// Run the main function
main();

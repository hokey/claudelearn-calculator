import { Router, Request, Response } from 'express';
import { Calculator } from '../../utils/calculator';

const router = Router();
const calculator = new Calculator();

type Operation = 'add' | 'subtract' | 'multiply' | 'divide' | 'pow' | 'mod' | 'sqrt';

interface CalculateRequest {
  operation: Operation;
  operands: number[];
}

interface CalculateResponse {
  result?: number;
  error?: boolean;
  message?: string;
}

router.post('/calculate', (req: Request, res: Response<CalculateResponse>) => {
  const { operation, operands } = req.body as CalculateRequest;

  if (!operation || !operands || !Array.isArray(operands)) {
    res.status(400).json({
      error: true,
      message: 'Invalid request: operation and operands are required',
    });
    return;
  }

  try {
    let result: number;

    switch (operation) {
      case 'add':
        if (operands.length !== 2) throw new Error('Add requires exactly 2 operands');
        result = calculator.add(operands[0], operands[1]);
        break;
      case 'subtract':
        if (operands.length !== 2) throw new Error('Subtract requires exactly 2 operands');
        result = calculator.subtract(operands[0], operands[1]);
        break;
      case 'multiply':
        if (operands.length !== 2) throw new Error('Multiply requires exactly 2 operands');
        result = calculator.multiply(operands[0], operands[1]);
        break;
      case 'divide':
        if (operands.length !== 2) throw new Error('Divide requires exactly 2 operands');
        result = calculator.divide(operands[0], operands[1]);
        break;
      case 'pow':
        if (operands.length !== 2) throw new Error('Pow requires exactly 2 operands');
        result = calculator.pow(operands[0], operands[1]);
        break;
      case 'mod':
        if (operands.length !== 2) throw new Error('Mod requires exactly 2 operands');
        result = calculator.mod(operands[0], operands[1]);
        break;
      case 'sqrt':
        if (operands.length !== 1) throw new Error('Sqrt requires exactly 1 operand');
        result = calculator.sqrt(operands[0]);
        break;
      default:
        res.status(400).json({
          error: true,
          message: `Unknown operation: ${operation}`,
        });
        return;
    }

    res.json({ result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error occurred';
    res.status(400).json({
      error: true,
      message,
    });
  }
});

export default router;

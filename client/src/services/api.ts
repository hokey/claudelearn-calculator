export type Operation = 'add' | 'subtract' | 'multiply' | 'divide' | 'pow' | 'mod' | 'sqrt';

interface CalculateResponse {
  result?: number;
  error?: boolean;
  message?: string;
}

export async function calculate(
  operation: Operation,
  operands: number[]
): Promise<CalculateResponse> {
  const response = await fetch('/api/v1/calculate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ operation, operands }),
  });

  return response.json();
}

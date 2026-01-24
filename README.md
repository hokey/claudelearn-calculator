# ClaudeLearn

A simple TypeScript project for learning Claude Code capabilities.

## Project Structure

This is a basic TypeScript application with a modular architecture:

- `src/index.ts` - Main entry point
- `src/utils/` - Utility modules (e.g., Calculator)
- `dist/` - Compiled JavaScript output

## Development Commands

### Build
```bash
npm run build
```
Compiles TypeScript to JavaScript in the `dist/` directory.

### Run
```bash
npm start
```
Runs the compiled application.

### Development Mode
```bash
npm run dev
```
Runs the application directly with ts-node (no compilation needed).

### Testing
```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
```

### Linting
```bash
npm run lint
```
Checks code quality with ESLint.

## Learning Goals

This project demonstrates:
- TypeScript configuration and compilation
- Jest testing framework
- ESLint code quality checks
- Modular code architecture
- Basic utility class implementation

import { GaussianEliminationService } from '../services/gaussian-elimination-service';
import { decimal4x4Solution, decimal4x4System, integer4x4Solution, integer4x4System } from '../utils/tests-constants/linear-systems';

const linearSystemSolver = new GaussianEliminationService();


test('integer-4-x-4-system-solve-by-gaussian-elimination', () => {
  const solutionTest = linearSystemSolver.solve(integer4x4System);
  expect(linearSystemSolver.test(integer4x4System, solutionTest, 1e-16)).toBe(true);
});

test('simple-4x4-system-test', () => { 
  expect(linearSystemSolver.test(integer4x4System, integer4x4Solution, 1e-16)).toBe(true);
});

test('decimal-4x4-system-solve-by-gaussian-elimination', () => {
  const solutionTest = linearSystemSolver.solve(decimal4x4System);
  expect(linearSystemSolver.test(decimal4x4System, solutionTest, 1e-6)).toBe(true);
});

test('decimal-4x4-system-test', () => {
  expect(linearSystemSolver.test(decimal4x4System, decimal4x4Solution, 1e-6)).toBe(true);
});
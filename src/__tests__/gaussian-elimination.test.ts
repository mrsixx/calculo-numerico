import { LinearSystem } from '../models/linear-system';
import { Matrix } from '../models/matrix';
import { GaussianEliminationService } from '../services/gaussian-elimination-service';
import { decimal4x4Solution, integer4x4Solution, getDecimal4x4LinearSystem, getInteger4x4LinearSystem, getIndeterminateLinearSystem } from '../utils/tests-constants/linear-systems';

const linearSystemSolver = new GaussianEliminationService();

test('impossible-system', () => {
  const impossibleSystemErrorString = 'The linear system admits infinite or no solutions.'
  const tryCreateImpossibleSystem = () => getIndeterminateLinearSystem();
  expect(tryCreateImpossibleSystem).toThrowError(impossibleSystemErrorString);
});

// absolute error only in the 16th decimal place
test('integer-4-x-4-system-solve-by-gaussian-elimination', () => {
  const integer4x4System = getInteger4x4LinearSystem();
  const solutionTest = linearSystemSolver.solve(integer4x4System);
  expect(linearSystemSolver.test(integer4x4System, solutionTest, 1e-16)).toBe(true);
});

test('simple-4x4-system-test', () => { 
  const integer4x4System = getInteger4x4LinearSystem();
  console.log({entries: integer4x4Solution.getCol(0)});
  expect(linearSystemSolver.test(integer4x4System, integer4x4Solution, 1e-16)).toBe(true);
});

// absolute error only in the 6th decimal place. TODO: optimize data structures to get smaller error
test('decimal-4x4-system-solve-by-gaussian-elimination', () => {
  const decimal4x4System = getDecimal4x4LinearSystem();
  const solutionTest = linearSystemSolver.solve(decimal4x4System);
  expect(linearSystemSolver.test(decimal4x4System, solutionTest, 1e-6)).toBe(true);
});

test('decimal-4x4-system-test', () => {
  const decimal4x4System = getDecimal4x4LinearSystem();
  expect(linearSystemSolver.test(decimal4x4System, decimal4x4Solution, 1e-6)).toBe(true);
});


test('aaa', () => {
  const coefs = Matrix.from([[1,2,4],[1,3,9],[1,4,16]]);
  const results = Matrix.from([[3],[7],[6]]);
  console.log(linearSystemSolver.solve(new LinearSystem(coefs, results)));
  expect(true).toBe(true);

});
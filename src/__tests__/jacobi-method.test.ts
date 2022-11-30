import { Matrix } from '../models/matrix';
import { JacobiMethodService } from '../services/jacobi-method-service';
import { getInteger4x4LinearSystem } from '../utils/tests-constants/linear-systems';

const linearSystemSolver = new JacobiMethodService();

test('jacobi-method-iteraction', () => {
  const integer4x4System = getInteger4x4LinearSystem();
  const solution = linearSystemSolver.solve(integer4x4System, Matrix.zero(4,1), 10e-16);
  expect(linearSystemSolver.test(integer4x4System, solution, 10e-16)).toBe(true);
});
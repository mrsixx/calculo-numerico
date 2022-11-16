import { Matrix } from '../models/matrix';
import { JacobiMethodService } from '../services/jacobi-method-service';
import { getInteger4x4LinearSystem } from '../utils/tests-constants/linear-systems';

const linearSystemSolver = new JacobiMethodService();

test('blank-test', () => {
  const integer4x4System = getInteger4x4LinearSystem();
  linearSystemSolver.solve(integer4x4System, Matrix.zero(4,1), 10e-16);
  expect(true).toBe(true);
});
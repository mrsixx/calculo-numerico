import RealFunctionType from '../types/RealFunctionType';
import { SimpsomMethodService } from '../services/simpsom-method-service';
const simpsomMethodIntegralSolver = new SimpsomMethodService();

test('integral-of-a-polynomial', () => {
  const f: RealFunctionType = (x: number) => 5*x + (3/2)*x**2;

  expect(simpsomMethodIntegralSolver.solve(f, 0, 1)).toEqual(3);
})
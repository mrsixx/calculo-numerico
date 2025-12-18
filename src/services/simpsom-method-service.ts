import IntegralSolver from "../models/integral-solver";
import RealFunctionType from "../types/RealFunctionType";

export class SimpsomMethodService extends IntegralSolver {
  /**
   * Solve numeric value of an integral by Simpsom method. Exact solution for polynomials of degree up to 3.
   * @param system Linear system under test
   * @param solutionTest Possible solution
   * @param desiredPrecision Desired decimal precision, e.g: 1e-6
   * @returns True if Euclidean norm of the absolute error of the solution array is less than the desired precision
   */
  solve(f: RealFunctionType, a: number, b: number): number {
    const m = (a+b)/2;
    return ((b-a)/6)*(f(a) + 4*f(m) + f(b));
  }
}
import RealFunctionType from "../types/RealFunctionType";

abstract class IntegralSolver {
  /**
   * Calculates the numerical value of the integral of the function f over the interval [a,b]
   * @param f Integrable real function f(x): R-> R
   * @param a Lower limit of interval
   * @param b Upper limit of interval
   * @returns Numeric solution of the integral
   */
  abstract solve(f: RealFunctionType, a: number, b: number) : number;
}

export default IntegralSolver;
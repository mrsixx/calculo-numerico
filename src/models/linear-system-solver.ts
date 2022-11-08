import { vector2Norm } from "../utils/math-utils";
import { LinearSystem } from "./linear-system";

abstract class LinearSystemSolver {
  protected maxOfIterations: number;
  
  constructor() {
    this.maxOfIterations = 1000;
  }
  /**
   * Tests whether a solution satisfies the given linear system
   * @param system Linear system under test
   * @param solutionTest Possible solution
   * @param desiredPrecision Desired decimal precision, e.g: 1e-6
   * @returns True if Euclidean norm of the absolute error of the solution array is less than the desired precision
   */
  test(system: LinearSystem, solutionTest: number[], desiredPrecision: number): boolean {
    const toSumOfTerms = (term1: number, term2: number) => term1 + term2;
    const toOperationResult = ({ a, x }: { a: number; x: number }) => a * x;
    const toCoefficientAndVariablePair = (coef: number, idx: number) => ({
      a: coef,
      x: solutionTest[idx],
    });

    // console.log({coef: system.coefficientsMatrix.entries, results: system.resultsMatrix.entries});
    const resultMatrix = system.resultsMatrix.getCol(0);
    const error = system.coefficientsMatrix.entries
      .map((equation, eqIdx) => {
        const realSolution = resultMatrix[eqIdx];
        // console.log(equation.map(toCoefficientAndVariablePair));
        const calculationResult = equation.map(toCoefficientAndVariablePair)
                                        .map(toOperationResult)
                                        .reduce(toSumOfTerms);
        const absoluteError = Math.abs(realSolution - calculationResult);
        return absoluteError;
      });
      const errorNorm = vector2Norm(error);
      return  errorNorm <= desiredPrecision;
  }
}


export abstract class ExactLinearSystemSolver extends LinearSystemSolver {
  
  abstract solve (system: LinearSystem): number[];
}

export abstract class IteractiveLinearSystemSolver extends LinearSystemSolver {

  abstract solve (system: LinearSystem, initialPoint: number[], desiredPrecision: number): number[];
}
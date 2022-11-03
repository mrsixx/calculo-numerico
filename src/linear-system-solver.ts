import { scalingByGaussianElimination } from './utils/matrices-utils';
import { LinearSystem } from './models/linear-system';
import { vector2Norm } from './utils/math-utils';

const maxOfIterations = 1000;

export class LinearSystemSolver {
  /**
   * Solve a linear system by Gaussian elimination method with parcial pivoting
   * @param system Linear system
   * @returns System exact solution vector
   */
  solveByGaussianElimination(system: LinearSystem): number[] {
    const scaledMatrix = scalingByGaussianElimination(system.expandedMatrix);
    const n = scaledMatrix.length;
    const solution = new Array(n).fill(0);

    // AX = B
    const matrixA = scaledMatrix.map((row) => row.slice(0, row.length - 1));
    const matrixB = scaledMatrix.map((row) => row[row.length - 1]);

    // upper triangular matrix -> from last row to first
    for (let k = n - 1; k >= 0; k--) {
      let sum = 0;
      for (let j = k; j < n; j++) {
        sum += matrixA[k][j] * solution[j];
      }

      solution[k] = (matrixB[k] - sum) / matrixA[k][k];
    }
    return solution;
  }
  
  solveByJacobiMethod (system: LinearSystem, initialPoint: number[], desiredPrecision: number): number[] {
    return [];
  }

  solveByGaussSeidelMethod(system: LinearSystem, initialPoint: number[], desiredPrecision: number): number[]{
    return [];
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

    const error = system.coefficientsMatrix
      .map((equation, eqIdx) => {
        const realSolution = system.resultsMatrix[eqIdx];
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

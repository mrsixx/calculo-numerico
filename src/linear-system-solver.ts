import { scalingByGaussianElimination } from './utils/matrices-utils';
import { LinearSystem } from './models/linear-system';

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

    for (let k = n - 1; k >= 0; k--) {
      let sum = 0;
      for (let j = k; j < n; j++) {
        sum += matrixA[k][j] * solution[j];
      }
      solution[k] = (matrixB[k] - sum) / matrixA[k][k];
    }
    return solution;
  }
  
  solveByJacobiMethod (system: LinearSystem): number[]{
    return [];
  }

  solveByGaussSeidelMethod(system: LinearSystem): number[]{
    return [];
  }
  /**
   * Tests whether a solution satisfies the given linear system
   * @param system Linear system under test
   * @param solution Possible solution
   * @param desiredPrecision Desired decimal precision, e.g: 1e-6
   * @returns True if absolute error of each entry in the solution array is less than the desired precision
   */
  test(system: LinearSystem, solution: number[], desiredPrecision: number): boolean {
    const toSumOfTerms = (term1: number, term2: number) => term1 + term2;
    const toOperationResult = ({ a, x }: { a: number; x: number }) => a * x;
    const toCoefficientAndVariablePair = (coef: number, idx: number) => ({
      a: coef,
      x: system.resultsMatrix[idx],
    });

    return system.coefficientsMatrix
      .map((equation, eqIdx) => {
        const equationSolution = solution[eqIdx];
        const equationResult = equation.map(toCoefficientAndVariablePair).map(toOperationResult).reduce(toSumOfTerms);

        const absoluteError = Math.abs(equationSolution - equationResult);
        return absoluteError;
      })
      .every((absoluteError) => absoluteError <= desiredPrecision);
  }
}

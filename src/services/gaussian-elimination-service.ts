import { ExactLinearSystemSolver } from "../models/linear-system-solver"
import { LinearSystem } from "../models/linear-system";
import { scalingByGaussianElimination } from "../utils/matrices-utils";

export class GaussianEliminationService extends ExactLinearSystemSolver {
  
  /**
   * Solve a linear system by Gaussian elimination method with parcial pivoting
   * @param system Linear system
   * @returns System exact solution vector
   */
  solve(system: LinearSystem): number[] {
    const scaledMatrix = scalingByGaussianElimination(system.expandedMatrix);
    const n = scaledMatrix.rows;
    const solution = new Array(n).fill(0);

    // AX = B
    const matrixA = scaledMatrix.entries.map((row) => row.slice(0, row.length - 1));
    const matrixB = scaledMatrix.entries.map((row) => row[row.length - 1]);

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
  

}
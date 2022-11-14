import { ExactLinearSystemSolver } from "../models/linear-system-solver"
import { LinearSystem } from "../models/linear-system";
import { scalingByGaussianElimination } from "../utils/matrices-utils";
import { Matrix } from "../models/matrix";

export class GaussianEliminationService extends ExactLinearSystemSolver {
  
  /**
   * Solve a linear system by Gaussian elimination method with parcial pivoting
   * @param system Linear system
   * @returns System exact solution vector
   */
  solve(system: LinearSystem): Matrix {
    const { scaledMatrix } = scalingByGaussianElimination(system.expandedMatrix);
    const n = scaledMatrix.rows;
    // AX = B
    const matrixA = scaledMatrix.entries.map((row) => row.slice(0, system.coefficientsMatrix.cols));
    const matrixB = scaledMatrix.entries.map((row) => row.slice(-1* system.resultsMatrix.cols));
    
    const qtdSolutions = matrixB[0].length;
    const solution = Matrix.zero(n, qtdSolutions);
    // upper triangular matrix -> from last row to first
    for (let k = n - 1; k >= 0; k--) {
      // for each solution column in expanded matrix
      for(let s = 0; s < qtdSolutions; s++) {
          let sum = 0;
          for (let j = k; j < n; j++) {
            sum += matrixA[k][j] * solution.getEntry(j,s);
          }
          
          const entry = (matrixB[k][s] - sum) / matrixA[k][k];
          solution.setEntry(k, s, entry);
      }
    }
    return solution;
  }
}
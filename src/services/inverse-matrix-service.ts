import { LinearSystem } from "../models/linear-system";
import { Matrix } from "../models/matrix";
import { GaussianEliminationService } from "./gaussian-elimination-service";
const gaussianEliminationService = new GaussianEliminationService();
export class InverseMatrixService {
  
  inverse(matrix: Matrix): Matrix {
    if(!matrix.isSquare)
      throw new Error('Non-square matrices do not have an inverse.');

    const identityMatrix = Matrix.identity(matrix.rows);
    const inverseMatrix = Matrix.zero(matrix.rows, matrix.cols);

    identityMatrix.forEachCol((b, idx) => {
      // a*x = b linear system
      const a = matrix.entries as number[][];
      const system = new LinearSystem(a, b);
      const x = gaussianEliminationService.solve(system);
      inverseMatrix.setCol(x, idx);
    });
    
    return inverseMatrix;
  }
}
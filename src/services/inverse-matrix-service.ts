import { LinearSystem } from "../models/linear-system";
import { Matrix } from "../models/matrix";
import { GaussianEliminationService } from "./gaussian-elimination-service";
const gaussianEliminationService = new GaussianEliminationService();
export class InverseMatrixService {
  
   inverse(matrix: Matrix): Matrix {
    if(!matrix.isSquare)
      throw new Error('Non-square matrices do not have an inverse.');

      if(matrix.determinant() === 0)
        throw new Error('Matrices with null determinants do not have an inverse.');

    const identityMatrix = Matrix.identity(matrix.rows);
    
    const linearSystem = new LinearSystem(matrix, identityMatrix);
    const inverseMatrix = gaussianEliminationService.solve(linearSystem);
    
    return inverseMatrix;
  }
}
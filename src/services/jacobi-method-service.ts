import { LinearSystem } from "../models/linear-system";
import { IteractiveLinearSystemSolver } from "../models/linear-system-solver";
import { Matrix } from "../models/matrix";
import { matrix1Norm } from "../utils/math-utils";
import { absoluteErrorMatrix } from "../utils/matrices-utils";

export class JacobiMethodService extends IteractiveLinearSystemSolver {
  
  solve(system: LinearSystem, initialPoint: Matrix, desiredPrecision: number): Matrix {
    const n = system.coefficientsMatrix.rows;
    if(initialPoint.order !== `${n}x1`)
      throw new Error(`Initial point must be a matrix ${n}x1.`);
    
    const point = Matrix.from(initialPoint.entries);
    for(let k = 0; matrix1Norm(absoluteErrorMatrix(point, initialPoint)) <= desiredPrecision && k < this.maxOfIterations; k++){
      const xk = point.getCol(0) as number[];
      console.log({get: xk});
      for(let i = 0; i < point.rows; i++)
      {
        let sum = 0; 
        const bi = system.resultsMatrix.getEntry(i, 0);
        const aii =  system.coefficientsMatrix.getEntry(i,i);
        for(let j = 0; j < point.cols; j++){
          const aij = system.coefficientsMatrix.getEntry(i,j);
          const xki = xk[i];
          if(i != j)
            sum +=  aij * xki / aii;
        }
        xk[i] = bi/aii - sum;
      }

      point.setCol(xk, 0);
      console.log({set: xk});
    }
    return point;
  }
}
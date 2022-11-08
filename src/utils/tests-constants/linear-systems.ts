import { LinearSystem } from "../../models/linear-system";
import { Matrix } from "../../models/matrix";

const indeterminateLinearSystemCoefsMatrix = Matrix.from([
  [0,1],
  [1,2],
  [2,3],
  [3,4]
]);

const integer4x4CoefsMatrix = Matrix.from([
  [2, 3, 1, 1],
  [4, 7, 4, 3],
  [4, 7, 6, 4],
  [6, 9, 9, 8],
]);
const integer4x4ResultsMatrix = Matrix.from([[3, 6, 4, 3]]).transpose();

const decimal4x4CoefsMatrix = Matrix.from([
  [8.7, 3, 9.3, 11],
  [24.5, -8.8, 11.5, -45.1],
  [52.3, -84, -23.5, 11.4],
  [21, -81, -13.2, 21.5],
]);
const decimal4x4ResultsMatrix = Matrix.from([[16.4, -49.7, -80.8, -106.3]]).transpose();


export const integer4x4Solution = [-1, 2, -1, 0];
export const decimal4x4Solution = [1, 2, -1, 1];

export const getIndeterminateLinearSystem = () => new LinearSystem(indeterminateLinearSystemCoefsMatrix, Matrix.zero(4,1))
export const getInteger4x4LinearSystem = () => new LinearSystem(integer4x4CoefsMatrix, integer4x4ResultsMatrix);
export const getDecimal4x4LinearSystem = () => new LinearSystem(decimal4x4CoefsMatrix, decimal4x4ResultsMatrix);
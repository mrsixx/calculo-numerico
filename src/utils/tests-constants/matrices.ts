import { Matrix } from "../../models/matrix";

export const rowMatrix = Matrix.from([[1,2,3]]);
export const colMatrix = Matrix.from([[1],[2],[3]]);
export const nonSquareMatrix = Matrix.from([[2, 3, 4, 5], [6, 7, 8, 0]]);
export const squareMatrixWhatever = Matrix.from([[1, 2, 3, 4], [5, 6, 7, 9], [9, 8, 7, 6], [5, 4, 3, 2]]);
export const squareMatrixWhateverInverseArray = [[1, 2, 3, 4], [5, 6, 7, 9], [9, 8, 7, 6], [5, 4, 3, 2]];
export const nonSquareMatrixTransposeArray = [[2, 6], [3, 7], [4, 8], [5, 0]];
export const squareMatrixWhateverTransposeArray = [[1, 5, 9, 5], [2, 6, 8, 4], [3, 7, 7, 3], [4, 9, 6, 2]];
export const identity4x4Array = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
export const malFormedArray = [[0, 0, 1], [2, 3, 4, 5], [0, 1, 3], [1, 2, 3, 4, 5, 6, 7, 8, 9]];
export const nonSquareZeroArray = [[0,0]];
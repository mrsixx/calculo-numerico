import { Matrix } from "../../models/matrix";

export const rowMatrixArray = [[1,2,3]];
export const colMatrixArray = [[1],[2],[3]];

export const nonSquareMatrixArray = [[2, 3, 4, 5], [6, 7, 8, 0]];
export const nonSquareMatrixTransposeArray = [[2, 6], [3, 7], [4, 8], [5, 0]];

export const squareMatrixArray = [[1, 2, 3, 4], [5, 6, 7, 9], [9, 8, 7, 6], [5, 4, 3, 2]];
export const InverseSquareMatrixArray = [[1, 2, 3, 4], [5, 6, 7, 9], [9, 8, 7, 6], [5, 4, 3, 2]];
export const squareMatrixTransposeArray = [[1, 5, 9, 5], [2, 6, 8, 4], [3, 7, 7, 3], [4, 9, 6, 2]];

export const identity4x4Array = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
export const malFormedArray = [[0, 0, 1], [2, 3, 4, 5], [0, 1, 3], [1, 2, 3, 4, 5, 6, 7, 8, 9]];
export const nonSquareZeroArray = [[0,0]];



/**
 * Build a 3x1 matrix
 * @returns 3x1 matrix
 */
export const getColMatrix = () => Matrix.from([...colMatrixArray]);
/**
 * Build a 1x3 matrix
 * @returns 1x3 matrix
 */
export const getRowMatrix = () => Matrix.from([...rowMatrixArray]);
/**
 * Build a 2x4 matrix
 * @returns 2x4 matrix
 */
export const getNonSquareMatrix = () => Matrix.from(nonSquareMatrixArray);
/**
 * Build a 4x4 matrix
 * @returns 3x1 matrix
 */
export const getSquareMatrix = () => Matrix.from([...squareMatrixArray])
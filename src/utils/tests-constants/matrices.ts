import { Matrix } from "../../models/matrix";

export const rowMatrixArray = [[1,2,3]];
export const colMatrixArray = [[1],[2],[3]];

export const nonSquareMatrixArray = [[2, 3, 4, 5], [6, 7, 8, 0]];
export const nonSquareMatrixTransposeArray = [[2, 6], [3, 7], [4, 8], [5, 0]];

export const squareMatrixArray = [[7, 4, 6], [2, 6, 10], [1, 2, 9]];
export const inverseSquareMatrixArray = [[17/97, -12/97, 2/97],[-4/97, 57/194, -29/97],[-1/97, -5/97, 17/97]];
export const squareMatrixTransposeArray = [[7, 2, 1], [4, 6, 2], [6, 10, 9]];
export const notInvertibleSquareMatrixArray = [[-1, 2, 9], [4, 7, 10], [-1, 2, 9]];

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
 * Build a 4x4 matrix not invertible
 * @returns 4x4 matrix
 */
 export const getSquareMatrix = () => Matrix.from([...squareMatrixArray])
/**
 * Build a 4x4 matrix not invertible
 * @returns 4x4 matrix
 */
export const getNotInvertibleSquareMatrix = () => Matrix.from([...notInvertibleSquareMatrixArray])
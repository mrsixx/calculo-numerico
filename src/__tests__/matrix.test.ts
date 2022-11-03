import { Matrix } from '../models/matrix';

const rowMatrix = Matrix.from([[1,2,3]]);
const colMatrix = Matrix.from([[1],[2],[3]]);
const nonSquareMatrix = Matrix.from([[2, 3, 4, 5], [6, 7, 8, 0]]);
const squareMatrixWhatever = Matrix.from([[1, 2, 3, 4], [5, 6, 7, 9], [9, 8, 7, 6], [5, 4, 3, 2]]);
const squareMatrixWhateverInverseArray = [[1, 2, 3, 4], [5, 6, 7, 9], [9, 8, 7, 6], [5, 4, 3, 2]];
const nonSquareMatrixTransposeArray = [[2, 6], [3, 7], [4, 8], [5, 0]];
const squareMatrixWhateverTransposeArray = [[1, 5, 9, 5], [2, 6, 8, 4], [3, 7, 7, 3], [4, 9, 6, 2]];
const identity4x4Array = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
const malFormedArray = [[0, 0, 1], [2, 3, 4, 5], [0, 1, 3], [1, 2, 3, 4, 5, 6, 7, 8, 9]];
const nonSquareZeroArray = [[0,0]];


test('try-create-mal-formed-matrix', () => {
  expect(() => {
    const _ = Matrix.from([]);
  }).toThrowError('Entry must be two specified dimensions.');
  expect(() => {
    const _ = Matrix.from(malFormedArray);
  }).toThrowError(`${malFormedArray} must be well-defined matrix.`);
});

test('1x2-zero-matrix', () => {
  const zero = Matrix.zero(1,2);
  expect(zero.entries).toEqual(nonSquareZeroArray);
})

test('4x4-identity-matrix', () => {
  const identity = Matrix.identity(4);
  expect(identity.entries).toEqual(identity4x4Array);
});

test('get-matrix-entry', () => {
  expect(squareMatrixWhatever.getEntry(2, 3)).toEqual(6);
  expect(squareMatrixWhatever.getEntry(0, 0)).toEqual(1);
  expect(squareMatrixWhatever.getEntry(3, 3)).toEqual(2);
  expect(() => {
    squareMatrixWhatever.getEntry(4,0);
  }).toThrowError(`Row index '4' not available.`);
  expect(() => {
    squareMatrixWhatever.getEntry(0,100);
  }).toThrowError(`Col index '100' not available.`);
});

test('get-matrix-row', () => {
  expect(squareMatrixWhatever.getRow(2)).toEqual([9, 8, 7, 6]);
  expect(() => {
    squareMatrixWhatever.getRow(5);
  }).toThrowError(`Row index '5' not available.`);
});

test('get-matrix-col', () => {
  expect(squareMatrixWhatever.getCol(2)).toEqual([3, 7, 7, 3]);
  expect(() => {
    squareMatrixWhatever.getCol(32);
  }).toThrowError(`Col index '32' not available.`);
});

test('get-matrix-order', () => {
  expect(squareMatrixWhatever.order).toEqual('4x4');
  expect(nonSquareMatrix.order).toEqual('2x4');
  expect(rowMatrix.order).toEqual('1x3');
  expect(colMatrix.order).toEqual('3x1');
})

test('matrix-shape', () => {
  expect(squareMatrixWhatever.isSquare).toBe(true);
  expect(nonSquareMatrix.isSquare).toBe(false);
});

test('inverse-matrix', () => {
  expect(() => {
    const _ = nonSquareMatrix.inverse();
  }).toThrowError('Non-square matrices do not have an inverse.');

  // TODO: get inverse of a square matrix
})

test('transpose-matrix', () => {
  const squareTranspose = squareMatrixWhatever.transpose();
  const nonSquareTranspose = nonSquareMatrix.transpose();

  expect(nonSquareTranspose.order).toEqual('4x2');
  expect(nonSquareTranspose.entries).toEqual(nonSquareMatrixTransposeArray);
  
  expect(squareTranspose.order).toEqual('4x4');
  expect(squareTranspose.entries).toEqual(squareMatrixWhateverTransposeArray)
})
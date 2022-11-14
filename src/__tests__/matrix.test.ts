import {
  malFormedArray, squareMatrixTransposeArray, nonSquareMatrixArray, inverseSquareMatrixArray,
  nonSquareMatrixTransposeArray, nonSquareZeroArray, identity4x4Array,
  getColMatrix, getNotInvertibleSquareMatrix, getSquareMatrix, getNonSquareMatrix, getRowMatrix
} from '../utils/tests-constants/matrices';
import { Matrix } from '../models/matrix';
import { InverseMatrixService } from '../services/inverse-matrix-service';
import { absoluteErrorMatrix } from '../utils/matrices-utils';
import { matrix1Norm } from '../utils/math-utils';

const getInverseMatrixService = () => new InverseMatrixService();

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
  const squareMatrix = getSquareMatrix();

  expect(squareMatrix.getEntry(2, 2)).toEqual(9);
  expect(squareMatrix.getEntry(0, 0)).toEqual(7);
  expect(squareMatrix.getEntry(1, 1)).toEqual(6);
  expect(() => {
    squareMatrix.getEntry(4,0);
  }).toThrowError(`Row index '4' not available.`);
  expect(() => {
    squareMatrix.getEntry(0,100);
  }).toThrowError(`Col index '100' not available.`);
});

test('get-matrix-row', () => {
  const squareMatrix = getSquareMatrix();

  expect(squareMatrix.getRow(2)).toEqual([1, 2, 9]);
  expect(() => {
    squareMatrix.getRow(5);
  }).toThrowError(`Row index '5' not available.`);
});

test('get-matrix-col', () => {
  const squareMatrix = getSquareMatrix();
  
  expect(squareMatrix.getCol(1)).toEqual([4, 6, 2]);
  expect(() => {
    squareMatrix.getCol(32);
  }).toThrowError(`Col index '32' not available.`);
});

test('get-matrix-order', () => {
  const rowMatrix = getRowMatrix();
  const colMatrix = getColMatrix();
  const squareMatrix = getSquareMatrix();
  const nonSquareMatrix = getNonSquareMatrix();

  expect(squareMatrix.order).toEqual('3x3');
  expect(nonSquareMatrix.order).toEqual('2x4');
  expect(rowMatrix.order).toEqual('1x3');
  expect(colMatrix.order).toEqual('3x1');
})

test('matrix-shape', () => {
  const squareMatrix = getSquareMatrix(), nonSquareMatrix = getNonSquareMatrix();
  
  expect(squareMatrix.isSquare).toBe(true);
  expect(nonSquareMatrix.isSquare).toBe(false);
});

test('transpose-matrix', () => {
  const squareMatrix = getSquareMatrix(), nonSquareMatrix = getNonSquareMatrix();
  const squareTranspose = squareMatrix.transpose();
  const nonSquareTranspose = nonSquareMatrix.transpose();

  expect(nonSquareTranspose.order).toEqual('4x2');
  expect(nonSquareTranspose.entries).toEqual(nonSquareMatrixTransposeArray);
  
  expect(squareTranspose.order).toEqual('3x3');
  expect(squareTranspose.entries).toEqual(squareMatrixTransposeArray)
})

test('set-col', () => {
  // nonSquareMatrix order is 2x4
  const setColSizeErrorString = 'Entries must have the same row length as the matrix';
  const squareMatrix = getSquareMatrix(), nonSquareMatrix = getNonSquareMatrix();
  expect(() => {
    nonSquareMatrix.setCol([], 0);
  }).toThrowError(setColSizeErrorString);

  expect(() => {
    nonSquareMatrix.setCol([1,2,3,4,5], 0);
  }).toThrowError(setColSizeErrorString);

  let index = 0;
  const nonSquareFirstCol = nonSquareMatrix.getCol(index);
  const nonSquareFirstColReversed = [...nonSquareFirstCol].reverse();
  nonSquareMatrix.setCol(nonSquareFirstColReversed, index);
  
  let matrixNewFirstCol = nonSquareMatrix.getCol(index);
  expect(matrixNewFirstCol).toEqual(nonSquareFirstColReversed);


  
  index = 1;
  const squareSecondCol = squareMatrix.getCol(index);
  const squareSecondColReversed = [...squareSecondCol].reverse();
  squareMatrix.setCol(squareSecondColReversed, index);

  matrixNewFirstCol = squareMatrix.getCol(index);
  expect(matrixNewFirstCol).toEqual(squareSecondColReversed);  
})

test('set-row', () => {
  // nonSquareMatrix order is 2x4
  const setRowSizeErrorString = 'Entries must have the same col length as the matrix';
  const squareMatrix = getSquareMatrix(), nonSquareMatrix = getNonSquareMatrix();
  expect(() => {
    nonSquareMatrix.setRow([], 0);
  }).toThrowError(setRowSizeErrorString);

  expect(() => {
    nonSquareMatrix.setRow([1,2,3,4,5], 0);
  }).toThrowError(setRowSizeErrorString);

  let index = 0;
  const nonSquareFirstRow = nonSquareMatrix.getRow(index);
  const nonSquareFirstRowReversed = [...nonSquareFirstRow].reverse();
  nonSquareMatrix.setRow(nonSquareFirstRowReversed, index);
  
  let matrixNewFirstRow = nonSquareMatrix.getRow(index);
  expect(matrixNewFirstRow).toEqual(nonSquareFirstRowReversed);


  
  index = 1;
  const squareSecondRow = squareMatrix.getRow(index);
  const squareSecondRowReversed = [...squareSecondRow].reverse();
  squareMatrix.setRow(squareSecondRowReversed, index);

  matrixNewFirstRow = squareMatrix.getRow(index);
  expect(matrixNewFirstRow).toEqual(squareSecondRowReversed);  
})

test('swap-rows', () => {
  const nonSquareMatrix = getNonSquareMatrix();
  
  expect(nonSquareMatrix.getRow(0)).toEqual(nonSquareMatrixArray[0]);
  expect(nonSquareMatrix.getRow(1)).toEqual(nonSquareMatrixArray[1]);
  
  nonSquareMatrix.permuteRows(0,1);
  
  expect(nonSquareMatrix.getRow(0)).toEqual(nonSquareMatrixArray[1]);
  expect(nonSquareMatrix.getRow(1)).toEqual(nonSquareMatrixArray[0]);
  
});

test('inverse-matrix', () => {
  const service = getInverseMatrixService();
  const squareMatrix = getSquareMatrix(), squareNotInvertibleMatrix = getNotInvertibleSquareMatrix(), nonSquareMatrix = getNonSquareMatrix();

  expect(() => {
    const _ = service.inverse(nonSquareMatrix);
  }).toThrowError('Non-square matrices do not have an inverse.');

  expect(() => {
    const _ = service.inverse(squareNotInvertibleMatrix);
  }).toThrowError('Matrices with null determinants do not have an inverse.');

  const inverseMatrix = service.inverse(squareMatrix);

  const inverseOperationError = matrix1Norm(absoluteErrorMatrix(Matrix.from(inverseSquareMatrixArray), inverseMatrix));
  expect(inverseOperationError).toBeLessThanOrEqual(1e-16);
})
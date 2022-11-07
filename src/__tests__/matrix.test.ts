import { 
  colMatrix, identity4x4Array, malFormedArray, 
  nonSquareMatrix, nonSquareZeroArray, rowMatrix, 
  squareMatrixWhatever, squareMatrixWhateverInverseArray, 
  squareMatrixWhateverTransposeArray, nonSquareMatrixTransposeArray 
} from '../utils/tests-constants/matrices';
import { Matrix } from '../models/matrix';

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

  const inverseMatrix = squareMatrixWhatever.inverse();
  expect(inverseMatrix.entries).toEqual(squareMatrixWhateverInverseArray);
})

test('transpose-matrix', () => {
  const squareTranspose = squareMatrixWhatever.transpose();
  const nonSquareTranspose = nonSquareMatrix.transpose();

  expect(nonSquareTranspose.order).toEqual('4x2');
  expect(nonSquareTranspose.entries).toEqual(nonSquareMatrixTransposeArray);
  
  expect(squareTranspose.order).toEqual('4x4');
  expect(squareTranspose.entries).toEqual(squareMatrixWhateverTransposeArray)
})
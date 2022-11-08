import { Matrix } from '../models/matrix';
import { sum as vectorSum } from './math-utils';

// elementar operations
const multiplyRowByScalar = (linha: number[], escalar: number): number[] => {
  return linha.map((x) => x * escalar);
};

const subtractRow = (linha1: number[], linha2: number[]): number[] => {
  if (linha1.length !== linha2.length) throw new Error('Matriz deve ser quadrada');

  return linha1.map((x, idx) => x - linha2[idx]);
};

export function scalingByGaussianElimination(expandedMatrix: Matrix): Matrix {
  const entriesCopy = Matrix.from(expandedMatrix.entries).entries as number[][];
  const scaledMatrixEntries = entriesCopy.map((row, idxPivo) => {
    let pivot = entriesCopy[idxPivo][idxPivo];

    // permutation if pivot is null
    while (pivot === 0) {
      const idxNewPivot = entriesCopy.findIndex((matrixRow, idx) => matrixRow[idxPivo] !== 0 && idx > idxPivo);
      const tmp = entriesCopy[idxPivo];
      entriesCopy[idxPivo] = entriesCopy[idxNewPivot];
      entriesCopy[idxNewPivot] = tmp;
      row = entriesCopy[idxPivo];
      pivot = entriesCopy[idxPivo][idxPivo];
    }

    for (let rowUnderPivotIdx = idxPivo + 1; rowUnderPivotIdx < entriesCopy.length; rowUnderPivotIdx++) {
      const rowUnderPivot = entriesCopy[rowUnderPivotIdx];
      const elementUnderPivot = rowUnderPivot[idxPivo];
      const alpha = elementUnderPivot / pivot;
      const operationResult = subtractRow(rowUnderPivot, multiplyRowByScalar(row, alpha));
      entriesCopy[rowUnderPivotIdx] = operationResult;
    }

    return row;
  });

  return Matrix.from(scaledMatrixEntries);
}

// export function scalingByGaussianElimination(expandedMatrix: number[][]): number[][] {
//   return expandedMatrix.map((row, idxPivo) => {
//     let pivot = expandedMatrix[idxPivo][idxPivo];

//     // permutation if pivot is null
//     while (pivot === 0) {
//       const idxNewPivot = expandedMatrix.findIndex((matrixRow, idx) => matrixRow[idxPivo] !== 0 && idx > idxPivo);
//       const tmp = expandedMatrix[idxPivo];
//       expandedMatrix[idxPivo] = expandedMatrix[idxNewPivot];
//       expandedMatrix[idxNewPivot] = tmp;
//       row = expandedMatrix[idxPivo];
//       pivot = expandedMatrix[idxPivo][idxPivo];
//     }

//     for (let i = idxPivo + 1; i < expandedMatrix.length; i++) {
//       const actualRow = expandedMatrix[i];
//       const div = actualRow[idxPivo];
//       const operationResult = subtractRow(actualRow, multiplyRowByScalar(row, div / pivot));
//       expandedMatrix[i] = operationResult;
//     }
//     return row;
//   });
// }

export function isSquareMatrix(matrix: number[][]) : boolean {
  const rowsLength = matrix.length;
  const cellsLength = vectorSum(matrix.map(row => row.length));
  return cellsLength === rowsLength ** 2;
}
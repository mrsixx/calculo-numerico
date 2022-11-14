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


export function scalingByGaussianElimination(expandedMatrix: Matrix): { scaledMatrix: Matrix, permutations: number } {
  let permutations = 0;
  const entriesCopy = Matrix.from(expandedMatrix.entries).entries as number[][];
  const scaledMatrixEntries = entriesCopy.map((row, idxPivo) => {
    let pivot = entriesCopy[idxPivo][idxPivo];

    // permutation if pivot is null
    while (pivot === 0) {
      const idxNewPivot = entriesCopy.findIndex((matrixRow, idx) => matrixRow[idxPivo] !== 0 && idx > idxPivo);
      
      // singular system
      if(idxNewPivot < 0)
        return new Array(row.length).fill(0);

      const tmp = entriesCopy[idxPivo];
      entriesCopy[idxPivo] = entriesCopy[idxNewPivot];
      entriesCopy[idxNewPivot] = tmp;
      row = entriesCopy[idxPivo];
      pivot = entriesCopy[idxPivo][idxPivo];
      permutations++;
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

  return { scaledMatrix: Matrix.from(scaledMatrixEntries), permutations };
}

export function isSquareMatrix(matrix: number[][]) : boolean {
  const rowsLength = matrix.length;
  const cellsLength = vectorSum(matrix.map(row => row.length));
  return cellsLength === rowsLength ** 2;
}


export function absoluteErrorMatrix(realMatrix: Matrix, calculatedMatrix: Matrix) {
  if(realMatrix.order !== calculatedMatrix.order)
    throw new Error('Matrices must be of the same order.');

  const result = Matrix.zero(realMatrix.rows, calculatedMatrix.cols);
  for(let i = 0; i < realMatrix.rows; i++)
    for(let j = 0; j < realMatrix.cols; j++)
      result.setEntry(i, j, Math.abs(realMatrix.getEntry(i,j) - calculatedMatrix.getEntry(i,j)));
  
  return result;
}
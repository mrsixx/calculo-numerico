import { scalingByGaussianElimination } from "../utils/matrices-utils";

const toRowLengthArray = (row: number[]): number => row.length;
const rowWithSizeOtherThan = (size: number) => {
  return (length: number): boolean => length !== size;
};

export class Matrix {
  private _order: { n: number, m: number };

  constructor(private _entries: number[][]) {
    if(this._entries.length === 0)
      throw new Error(`Entry must be two specified dimensions.`);  
    const colsSize = this._entries[0].length;
    if(this._entries.map(toRowLengthArray).some(rowWithSizeOtherThan(colsSize)))
      throw new Error(`${this._entries} must be well-defined matrix.`);

    this._order = { n: _entries.length, m: colsSize }
  }

  get entries(): ReadonlyArray<ReadonlyArray<number>>{
    return this._entries;
  }

  get order() : string {
    return `${this.rows}x${this.cols}`;
  }
  get rows() : number {
    return this._order.n;
  }

  get cols() : number {
    return this._order.m;
  }

  get isSquare() : boolean {
    return this.cols === this.rows;
  }

  getCol(col: number) : ReadonlyArray<number> {
    if(col >= this.cols)
      throw new Error(`Col index '${col}' not available.`)

    return this.entries.map(row => row[col]);
  }

  setCol(entries: number[], colIndex: number): void {
    if(entries.length !== this.rows)
      throw new Error('Entries must have the same row length as the matrix');
      
    for(let i = 0; i < this.rows; i++)
      this.setEntry(i, colIndex, entries[i]);
    
  }

  getRow(row: number): ReadonlyArray<number> {
    if(row >= this.rows)
      throw new Error(`Row index '${row}' not available.`)

    return this.entries[row];
  } 

  setRow(entries: number[], rowIndex: number): void {
    if(entries.length !== this.cols)
      throw new Error('Entries must have the same col length as the matrix');
    for(let j = 0; j < this.cols; j++)
      this.setEntry(rowIndex, j, entries[j]);
  }

  getEntry(row: number, col: number): number {
    if(row >= this.rows)
      throw new Error(`Row index '${row}' not available.`)
      
    if(col >= this.cols)
      throw new Error(`Col index '${col}' not available.`)
    return this.entries[row][col];
  }
  
  setEntry(row: number, col: number, entry: number): void {
    this._entries[row][col] = entry;
  }

  transpose(): Matrix {
    const transposeMatrix = Matrix.zero(this.cols, this.rows);
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        transposeMatrix.setEntry(j, i, this.getEntry(i, j));
      }
    }
    return transposeMatrix;
  }

  mapRows(callbackFn: (row: number[], index: number, array: number[][]) => unknown, thisArg?: any) : unknown[] {
    return this._entries.map(callbackFn, thisArg);
  }
  
  mapCols(callbackFn: (col: number[], index: number, array: number[][]) => unknown, thisArg?: any) : unknown[] {
    return this.transpose()._entries.map(callbackFn, thisArg);
  }

  forEachRow(callbackFn: (row: number[], index: number, array: number[][]) => void, thisArg?: any) : void {
    this._entries.forEach(callbackFn, thisArg)
  }

  forEachCol(callbackFn: (col: number[], index: number, array: number[][]) => void) : void {
    for(let j = 0; j < this.cols; j++)
    {
      const col = this.entries.map(row => row[j]);
      callbackFn(col, j, this.entries as number[][]);
    }
  }

  findRowIndex(predicate: (value: number[], index: number, obj: number[][]) => unknown, thisArg?: any): number {
    return this._entries.findIndex(predicate, thisArg);
  }

  permuteRows(indexRowA: number, indexRowB: number) {
    const isNotValidIndex = (index: number) : boolean => index < 0 || index >= this.rows;
    [indexRowA, indexRowB].forEach(index => {
      if(isNotValidIndex(index))
        throw new Error(`Index '${index}' is not a valid index.`);
    });

    const rowA = [...this.getRow(indexRowA)];
    const rowB = [...this.getRow(indexRowB)];
    
    this.setRow(rowB, indexRowA);
    this.setRow(rowA, indexRowB);
  }

  determinant() : number {  
    if(!this.isSquare)
      throw new Error('Non-square matrices do not have a determinant.');
    
    const { scaledMatrix, permutations } = scalingByGaussianElimination(this);
    let prod = 1;
    for(let i = 0; i < this.rows; i++)
      prod *= scaledMatrix.getEntry(i,i);

    return Math.pow(-1, permutations) * prod;
  }


  print() : void {
    console.log(this._entries.map(row => row.join(' ')).join('\n'));
  }

  static from(array: ReadonlyArray<ReadonlyArray<number>>): Matrix {
    // TODO: must be a better way to do a deep copy like this!!!
    const deepCopy: number[][] = JSON.parse(JSON.stringify(array));
    return new Matrix(deepCopy);
  }

  static zero(rows: number, cols: number): Matrix {
    const zeroMatrix: number[][] = [];

    for(let i = 0; i < rows; i++) {
      const row: number[] = [];
      for(let j = 0; j < cols; j++)
        row.push(0);

      zeroMatrix.push(row);
    }

    return Matrix.from(zeroMatrix);
  }

  static identity(order: number) : Matrix {
    const identityMatrix: number[][] = [];
    for(let i = 0; i < order; i++) {
      // fill row with 0s
      const row = new Array(order).fill(0);
      // turn diagonal to 1
      row[i] = 1;
      identityMatrix.push(row);
    }
    return Matrix.from(identityMatrix);
  }

}
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

  getRow(row: number): ReadonlyArray<number> {
    if(row >= this.rows)
      throw new Error(`Row index '${row}' not available.`)

    return this.entries[row];
  } 

  setCol(entries: number[], colIndex: number): void {
    if(entries.length != this.rows)
      throw new Error('Entries must have the same row length as the matrix');
      
    for(let i = 0; i < this.rows; i++){
      this._entries[i][colIndex] = entries[i];
    }
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

  forEachRow(callbackFn: (row: number[], index: number, array: number[][]) => void, thisArg?: any) : void {
    this._entries.forEach(callbackFn)
  }

  forEachCol(callbackFn: (col: number[], index: number, array: number[][]) => void, thisArg?: any) : void {
    this.transpose().forEachRow(callbackFn)
  }


  static from(array: ReadonlyArray<ReadonlyArray<number>>): Matrix {
    return new Matrix(array as number[][]);
  }

  static zero(rows: number, cols: number): Matrix {
    const zeroMatrix: number[][] = [];

    for(let i = 0; i < rows; i++){
      const row = new Array(cols).fill(0);
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
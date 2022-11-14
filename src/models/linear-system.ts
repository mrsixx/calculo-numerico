import { Matrix } from "./matrix";

const printCoefficient = (coef: number) => (coef < 0 ? `(${coef.toLocaleString()})` : coef.toLocaleString());

export class LinearSystem {
  constructor(public coefficientsMatrix: Matrix, public resultsMatrix: Matrix) {
    const systemGreaterThan1x1 = coefficientsMatrix.rows !== 1;
    const resultsIsRowMatrix = resultsMatrix.rows === 1;

    if(!coefficientsMatrix.isSquare)
      throw new Error('The linear system admits infinite or no solutions.');
    if(systemGreaterThan1x1 && resultsIsRowMatrix)
      throw new Error('The result matrix must be at least a column matrix.');
  }

  get expandedMatrix(): Matrix {
    const entries = this.coefficientsMatrix.entries.map((eq, idx) => {
      const results = this.resultsMatrix.getRow(idx);
      return [...eq, ...results];
    });
    return Matrix.from(entries);
  }

  print(): void {
    const operations = this.expandedMatrix.mapRows(row => {
      const coeficientes = row.slice(0, this.coefficientsMatrix.cols - 1);
      const resultado = row.slice(-1*this.resultsMatrix.cols);

       return [...resultado.map(res => coeficientes
        .map((coef, idx) => `${printCoefficient(coef)}*X${idx + 1}`)
        .join(' + ')
        .concat(` = ${res.toLocaleString()}`))];
      });
      console.log(operations);
  }
}

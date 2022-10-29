const printCoefficient = (coef: number) => (coef < 0 ? `(${coef.toLocaleString()})` : coef.toLocaleString());

export class LinearSystem {
  constructor(public coefficientsMatrix: number[][], public resultsMatrix: number[]) {}

  get expandedMatrix(): number[][] {
    return this.coefficientsMatrix.map((eq, idx) => {
      const result = this.resultsMatrix[idx];
      return [...eq, result];
    });
  }

  print(): void {
    this.expandedMatrix.forEach((row) => {
      const coeficientes = row.slice(0, row.length - 1);
      const resultado = row[row.length - 1];

      const str = coeficientes
        .map((coef, idx) => `${printCoefficient(coef)}*X${idx + 1}`)
        .join(' + ')
        .concat(` = ${resultado.toLocaleString()}`);

      console.log(str);
    });
  }
}

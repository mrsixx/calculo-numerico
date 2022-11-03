// quadratic vector
export const quadratic = (vector: number[]): number[] => vector.map(x => Math.pow(x,2));
// vector sum
export const sum = (vector: number[]): number => vector.reduce((a, b) => a + b);
// vector count
export const count = (vector: number[]): number => vector.length;
// vector greatest value using quadratic formula
export const greatest = (vector: number[]): number => vector.reduce((a, b) => (a + b + Math.abs(a - b)) * 0.5);
// vector smallest value using quadratic formula
export const smallest = (vector: number[]): number => vector.reduce((a, b) => (a + b - Math.abs(a - b)) * 0.5);
// vector average
export const average = (vector: number[]): number => (vector.length) ? sum(vector) / count(vector) : 0;
// vector variance
export const variance = (vector: number[]): number => average(quadratic(vector)) - Math.pow(average(vector), 2);
// vector standard deviation
export const standardDeviation = (vector: number[]): number => Math.sqrt(variance(vector));
// vector root mean square
export const rootMeanSquare = (vector: number[]): number => Math.sqrt(average(quadratic(vector)));
// vector Manhattan distance
export const vector1Norm = (vector: number[]): number => sum(vector.map(x => Math.abs(x)));
// vector euclidean norm
export const vector2Norm = (vector: number[]): number => Math.sqrt(sum(quadratic(vector)));
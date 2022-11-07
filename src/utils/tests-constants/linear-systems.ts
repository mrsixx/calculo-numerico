import { LinearSystem } from "../../models/linear-system";

const integer4x4Coefs = [
  [2, 3, 1, 1],
  [4, 7, 4, 3],
  [4, 7, 6, 4],
  [6, 9, 9, 8],
];
const integer4x4Results = [3, 6, 4, 3];

const decimal4x4Coefs = [
  [8.7, 3, 9.3, 11],
  [24.5, -8.8, 11.5, -45.1],
  [52.3, -84, -23.5, 11.4],
  [21, -81, -13.2, 21.5],
];
const decimal4x4Results = [16.4, -49.7, -80.8, -106.3];


export const integer4x4System = new LinearSystem(integer4x4Coefs, integer4x4Results);
export const integer4x4Solution = [-1, 2, -1, 0];
export const decimal4x4System = new LinearSystem(decimal4x4Coefs, decimal4x4Results);
export const decimal4x4Solution = [1, 2, -1, 1];
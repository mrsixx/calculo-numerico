import { LinearSystem } from "../models/linear-system";
import { IteractiveLinearSystemSolver } from "../models/linear-system-solver";

export class JacobiMethod extends IteractiveLinearSystemSolver {
  
  solve(system: LinearSystem, initialPoint: number[], desiredPrecision: number): number[] {
    throw new Error("Method not implemented.");
  }
}
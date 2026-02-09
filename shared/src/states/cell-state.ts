import { Weight } from '../types/weight';

export interface CellState extends Weight {
  id: string;
  weight: number;
}

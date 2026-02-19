import { Weight } from '../types/weight';
import { Coordinates } from '../types/coordinates';

export interface CellState extends Weight {
  id: string;
  coordinates: Coordinates;
  weight: number;
}

import { Weight } from '../types/weight';
import { Coordinates } from '../types/coordinates';

export interface CellState extends Weight {
  id: string;
  coordinates: Coordinates; //TODO remove this prop. cell coord should be get from hexagonal grid structure
  weight: number;
}

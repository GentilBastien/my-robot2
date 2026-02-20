import { Coordinates } from './coordinates';

/**
 * Returns the cells that must be crossed to make this path.
 * This path may have a cost
 */
export interface PathCoordinate {
  coordinatesPath: Coordinates[];
  costs: number[];
}

export interface StepPathCoordinate {
  startCoordinates: Coordinates;
  endCoordinates: Coordinates;
  cost: number;
}

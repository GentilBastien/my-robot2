import { Coordinates } from './coordinates';

/**
 * Defines the cells that must be crossed to make this path.
 * This path may have a cost.
 */
export interface PathCoordinate {
  coordinatesPath: Coordinates[];
  costs: number[];
}

/**
 * Defines a step in a pathing. A step is defined by pathing to an adjacent cell.
 * {@link startCoordinates} and {@link endCoordinates} are supposed adjacent, and
 * cost defines the cost to make this moves.
 */
export interface StepPathCoordinate {
  startCoordinates: Coordinates;
  endCoordinates: Coordinates;
  cost: number;
}

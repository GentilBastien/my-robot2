import { Coordinates } from './coordinates';

/**
 * Returns the cells that must be crossed to make this path.
 * This path may have a cost
 */
export type PathCoordinate = {
  coordinatesPath: Coordinates[];
  cost: number;
};

import { Coordinate } from './coordinate';

/**
 * Defines the cells that must be crossed to make this path.
 * Crossing a cell may have a cost associated.
 */
export interface PathCostCoordinate {
  coordinatesPath: Coordinate[];
  costs: number[];
}

/**
 * Defines a step in a pathing. A step is defined by pathing from a cell to another cell.
 * {@link startCoordinates} and {@link endCoordinates} are supposed adjacent OR in
 * a direct movement transition. For example, it can be a teleportation movement or a simple jump
 * from a cell to another. Cost defines the cost to make this moves.
 */
export interface StepPathCostCoordinate {
  startCoordinates: Coordinate;
  endCoordinates: Coordinate;
  cost: number;
}

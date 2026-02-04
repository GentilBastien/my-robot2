import { CellState } from '@states/cell-state';
import { Coordinates } from 'shared';

export interface ArenaState {
  cells: CellState[];
  robotPositions: Map<string, Coordinates>; // robotId linked to a coordinate
}

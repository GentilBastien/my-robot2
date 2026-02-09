import { CellState } from './cell-state';

export interface ArenaState {
  cells: Record<string, CellState>;
}

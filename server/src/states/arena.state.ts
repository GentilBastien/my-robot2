import { CellState } from '@states/cell-state';

export interface ArenaState {
  cells: Record<string, CellState>;
}

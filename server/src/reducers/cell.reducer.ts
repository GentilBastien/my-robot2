import { CellState, GameState } from 'shared';

export function updateCellState(gameState: Readonly<GameState>, cellState: CellState): GameState {
  return {
    ...gameState,
    arenaState: {
      cells: [], //TODO
    },
  };
}

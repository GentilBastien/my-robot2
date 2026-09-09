import { CellAttributeState, GameState, Reducer } from 'shared';

export const updateAttributeCellState =
  (cellId: string, cellAttributeState: CellAttributeState): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    return gameState;
  };

export const updateWeightCellState =
  (cellId: string, newWeight: number): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    return gameState;
  };

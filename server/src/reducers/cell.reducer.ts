import { GameState, Reducer } from 'shared';

export const updateCellState =
  (robotId: string, visibleCellSet: Set<string>): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    return gameState;
  };

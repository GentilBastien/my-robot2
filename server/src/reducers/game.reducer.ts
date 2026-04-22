import { GameState, GameStateTypeEnum, Reducer } from 'shared';

export const updateGameState =
  (newGameState: GameStateTypeEnum): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    return {
      ...gameState,
      state: newGameState,
    };
  };

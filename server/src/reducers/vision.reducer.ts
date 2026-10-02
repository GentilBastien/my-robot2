import { GameState, Reducer } from 'shared';

export const updateVisionCells =
  (robotId: string, newVision: string[]): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    return {
      ...gameState,
      robots: {
        ...gameState.robots,
        [robotId]: {
          ...gameState.robots[robotId],
          visionCells: newVision,
        },
      },
    };
  };

export const updateVisionRange =
  (robotId: string, newVisionRange: number): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    return {
      ...gameState,
      robots: {
        ...gameState.robots,
        [robotId]: {
          ...gameState.robots[robotId],
          visionRange: newVisionRange,
        },
      },
    };
  };

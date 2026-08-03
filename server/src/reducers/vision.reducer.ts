import { GameState, Reducer } from 'shared';

export const updateVision =
  (robotId: string, newVision: string[]): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    return {
      ...gameState,
      robots: {
        ...gameState.robots,
        [robotId]: {
          ...gameState.robots[robotId],
          vision: newVision,
        },
      },
    };
  };

export const addVision =
  (robotId: string, visionToAdd: string[]): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    const robotState = gameState.robots[robotId];
    return {
      ...gameState,
      robots: {
        ...gameState.robots,
        [robotId]: {
          ...robotState,
          vision: robotState.vision.concat(visionToAdd),
        },
      },
    };
  };

export const removeVision =
  (robotId: string, visionToRemove: string[]): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    const robotState = gameState.robots[robotId];
    return {
      ...gameState,
      robots: {
        ...gameState.robots,
        [robotId]: {
          ...robotState,
          vision: robotState.vision.filter(v => visionToRemove.includes(v)),
        },
      },
    };
  };

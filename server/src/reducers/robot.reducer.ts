import { Coordinate, GameState, Reducer, RobotStateTypeEnum } from 'shared';

export const updateCoordinates =
  (robotId: string, newCoordinates: Coordinate): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    return {
      ...gameState,
      robots: {
        ...gameState.robots,
        [robotId]: {
          ...gameState.robots[robotId],
          coordinates: newCoordinates,
        },
      },
    };
  };

export const updateSelfStates =
  (robotId: string, selfStates: RobotStateTypeEnum[]): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    return {
      ...gameState,
      robots: {
        ...gameState.robots,
        [robotId]: {
          ...gameState.robots[robotId],
          selfStates,
        },
      },
    };
  };

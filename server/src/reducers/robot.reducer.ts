import { GameState, Reducer, RobotStateTypeEnum } from 'shared';

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

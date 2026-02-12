import { GameState, Reducer, TurnState } from 'shared';
import { changeTurnState } from './helper.reducer';

export const turnAdvanceReducer =
  (nextTurnNumber: number, nextRobotId: string): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    const nextRobot = gameState.robots[nextRobotId];
    const newTurnState: TurnState = {
      currentTurnNumber: nextTurnNumber,
      currentTurnRobot: nextRobot,
    };
    return changeTurnState(gameState, newTurnState);
  };

import { GameState, Reducer, TurnState, TurnStateTypeEnum } from 'shared';
import { updateTurnState } from '@reducers/state-helper.reducer';

export const startTurnReducer =
  (turnStateTypeEnum: TurnStateTypeEnum): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    const currentTurnState = gameState.turnState;
    const newTurnState: TurnState = {
      currentTurnNumber: currentTurnState.currentTurnNumber,
      currentTurnRobot: currentTurnState.currentTurnRobot,
      turnStateTypeEnum,
    };
    return updateTurnState(gameState, newTurnState);
  };

export const turnAdvanceReducer =
  (nextTurnNumber: number, nextRobotId: string): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    const nextRobot = gameState.robots[nextRobotId];
    const newTurnState: TurnState = {
      currentTurnNumber: nextTurnNumber,
      currentTurnRobot: nextRobot,
      turnStateTypeEnum: gameState.turnState.turnStateTypeEnum,
    };
    return updateTurnState(gameState, newTurnState);
  };

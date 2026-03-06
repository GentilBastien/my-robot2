import { GameState, Reducer, TurnState, TurnStateTypeEnum } from 'shared';
import { updateTurnState } from '@reducers/state-helper.reducer';

export const startTurnReducer =
  (turnStateTypeEnum: TurnStateTypeEnum): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    const currentTurnState = gameState.turnState;
    const newTurnState: TurnState = {
      currentTurnNumber: currentTurnState.currentTurnNumber,
      currentTurnRobotId: currentTurnState.currentTurnRobotId,
      turnStateTypeEnum,
    };
    return updateTurnState(gameState, newTurnState);
  };

export const turnAdvanceReducer =
  (nextTurnNumber: number, nextRobotId: string): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    const newTurnState: TurnState = {
      currentTurnNumber: nextTurnNumber,
      currentTurnRobotId: nextRobotId,
      turnStateTypeEnum: gameState.turnState.turnStateTypeEnum,
    };
    return updateTurnState(gameState, newTurnState);
  };

import { RequestTurnStartStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum, GameState } from 'shared';
import { TurnStartResponseStateEvent } from '@events/response-state.event';
import { GameCalculator } from '@game/game-calculator/game.calculator';

export function turnStartRequestStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  requestTurnStartStateEvent: RequestTurnStartStateEvent
): TurnStartResponseStateEvent {
  //sourceRobotId of requestTurnStartStateEvent is the id of the robot that previously played.
  const newTurnState = gameCalculator.newTurnState(readonlyGameState);
  // const allowed = newTurnState.currentTurnRobotId === requestTurnStartStateEvent.sourceRobotId;
  const allowed = true;
  return {
    gameEventType: GameEventTypeEnum.TURN_START,
    responseValidated: allowed,
    sourceRobotId: newTurnState.currentTurnRobotId,
    turnNumber: newTurnState.currentTurnNumber,
    turnRobotId: newTurnState.currentTurnRobotId,
  };
}

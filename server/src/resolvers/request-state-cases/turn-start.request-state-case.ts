import { RequestTurnStartStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum, GameState } from 'shared';
import { TurnStartResponseStateEvent } from '@events/response-state.event';
import { GameCalculator } from '@game/game-calculator/game.calculator';

export function turnStartRequestStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  requestTurnStartStateEvent: RequestTurnStartStateEvent
): TurnStartResponseStateEvent {
  const newTurnState = gameCalculator.newTurnState(readonlyGameState);
  const allowed = newTurnState.currentTurnRobotId === requestTurnStartStateEvent.sourceRobotId;
  return {
    gameEventType: GameEventTypeEnum.TURN_START,
    responseValidated: allowed,
    sourceRobotId: requestTurnStartStateEvent.sourceRobotId,
    turnNumber: newTurnState.currentTurnNumber,
    turnRobotId: newTurnState.currentTurnRobotId,
  };
}

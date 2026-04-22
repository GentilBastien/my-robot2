import { RequestTurnEndStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum, GameState } from 'shared';
import { TurnEndResponseStateEvent } from '@events/response-state.event';
import { GameCalculator } from '@game/game-calculator/game.calculator';

export function turnEndRequestStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  requestTurnEndStateEvent: RequestTurnEndStateEvent
): TurnEndResponseStateEvent {
  const allowed = gameCalculator.isRobotTurn(requestTurnEndStateEvent.sourceRobotId);
  const turnNumber = gameCalculator.getTurnNumber(readonlyGameState);
  const turnRobotId = gameCalculator.getPlayingRobotId();
  return {
    gameEventType: GameEventTypeEnum.TURN_END,
    responseValidated: allowed,
    sourceRobotId: requestTurnEndStateEvent.sourceRobotId,
    turnNumber,
    turnRobotId,
  };
}

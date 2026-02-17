import { RequestTurnEndStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum, GameState, ResponseTypeEnum } from 'shared';
import { EndTurnResponseStateEvent } from '@events/response-state.event';
import { GameCalculator } from '../../game/game-calculator/game.calculator';

export function turnEndRequestStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  requestTurnEndStateEvent: RequestTurnEndStateEvent
): EndTurnResponseStateEvent {
  const allowed = gameCalculator.isRobotTurn(readonlyGameState, requestTurnEndStateEvent.sourceRobotId);
  const turnNumber = gameCalculator.getTurnNumber(readonlyGameState);
  const turnRobotId = gameCalculator.getRobotPlayingId();
  return {
    gameEventType: GameEventTypeEnum.TURN_END,
    responseType: allowed ? ResponseTypeEnum.VALID : ResponseTypeEnum.INVALID,
    sourceRobotId: requestTurnEndStateEvent.sourceRobotId,
    turnNumber,
    turnRobotId,
  };
}

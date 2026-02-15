import { RequestTurnStartStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum, GameState, ResponseTypeEnum } from 'shared';
import { StartTurnResponseStateEvent } from '@events/response-state.event';
import { GameCalculator } from '../../game/game-calculator/game.calculator';

export function turnStartRequestStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  requestTurnStartStateEvent: RequestTurnStartStateEvent
) {
  const allowed = gameCalculator.isRobotTurn(readonlyGameState, requestTurnStartStateEvent.sourceRobotId);
  const turnNumber = gameCalculator.getTurnNumber(readonlyGameState);
  const turnRobotId = gameCalculator.getRobotPlayingId();
  return {
    gameEventType: GameEventTypeEnum.TURN_START,
    responseType: allowed ? ResponseTypeEnum.VALID : ResponseTypeEnum.INVALID,
    turnNumber,
    turnRobotId,
  } as StartTurnResponseStateEvent;
}

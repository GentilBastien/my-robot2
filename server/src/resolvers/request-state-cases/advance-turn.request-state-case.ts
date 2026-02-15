import { RequestAdvanceTurnStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum, GameState, ResponseTypeEnum } from 'shared';
import { AdvanceTurnResponseStateEvent } from '@events/response-state.event';
import { GameCalculator } from '../../game/game-calculator/game.calculator';

export function advanceTurnRequestStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  requestAdvanceTurnEvent: RequestAdvanceTurnStateEvent
) {
  const allowed = gameCalculator.isRobotTurn(readonlyGameState, requestAdvanceTurnEvent.sourceRobotId);
  const newTurnState = gameCalculator.newTurnState(readonlyGameState);
  return {
    gameEventType: GameEventTypeEnum.ADVANCE_TURN,
    responseType: allowed ? ResponseTypeEnum.VALID : ResponseTypeEnum.INVALID,
    turnNumber: newTurnState.currentTurnNumber,
    turnRobotId: newTurnState.currentTurnRobot.id,
  } as AdvanceTurnResponseStateEvent;
}

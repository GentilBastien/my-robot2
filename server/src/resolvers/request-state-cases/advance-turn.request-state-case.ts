import { RequestAdvanceTurnStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum, GameState } from 'shared';
import { AdvanceTurnResponseStateEvent } from '@events/response-state.event';
import { GameCalculator } from '@game/game-calculator/game.calculator';

export function advanceTurnRequestStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  requestAdvanceTurnEvent: RequestAdvanceTurnStateEvent
): AdvanceTurnResponseStateEvent {
  const allowed = gameCalculator.isRobotTurn(requestAdvanceTurnEvent.sourceRobotId);
  const newTurnState = gameCalculator.newTurnState(readonlyGameState);
  return {
    gameEventType: GameEventTypeEnum.ADVANCE_TURN,
    responseValidated: allowed,
    sourceRobotId: requestAdvanceTurnEvent.sourceRobotId,
    turnNumber: newTurnState.currentTurnNumber,
    turnRobotId: newTurnState.currentTurnRobotId,
  };
}

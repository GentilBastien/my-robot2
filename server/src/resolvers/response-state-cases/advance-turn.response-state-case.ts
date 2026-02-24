import { AdvanceTurnResponseStateEvent } from '@events/response-state.event';
import { GameEventTypeEnum, Reducer } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { turnAdvanceReducer } from '../../reducers/turn.reducer';
import { RequestStateEvent, RequestTurnStartStateEvent } from '@events/request-state.event';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';

export function advanceTurnResponseStateCase(
  gameCalculator: GameCalculator,
  responseAdvanceTurnEvent: AdvanceTurnResponseStateEvent,
  pendingGameEvents: PriorityListStructure<RequestStateEvent>
): Reducer {
  gameCalculator.advanceTurn();

  const requestTurnStartStateEvent: RequestTurnStartStateEvent = {
    gameEventType: GameEventTypeEnum.TURN_START,
    sourceRobotId: responseAdvanceTurnEvent.sourceRobotId,
  };
  pendingGameEvents.add(requestTurnStartStateEvent);

  return turnAdvanceReducer(responseAdvanceTurnEvent.turnNumber, responseAdvanceTurnEvent.turnRobotId);
}

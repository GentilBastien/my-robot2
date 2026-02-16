import { EndTurnResponseStateEvent } from '@events/response-state.event';
import { RequestStateEvent } from '@events/request-state.event';
import { startTurnReducer } from '../../reducers/turn.reducer';
import { GameState, Reducer, TurnStateTypeEnum } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';

export function turnEndResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  endTurnResponseStateEvent: EndTurnResponseStateEvent,
  pendingGameEvents: PriorityListStructure<RequestStateEvent>
): Reducer {
  const robotPlayingId = endTurnResponseStateEvent.turnRobotId;
  const activeEffectInstances = gameCalculator.getActiveEffectInstances(readonlyGameState);
  const newPendingGameEventsFromEffects = activeEffectInstances.flatMap(activeEffectInstance => {
    let newPendingGameEvents: RequestStateEvent[] = [];
    if (robotPlayingId === activeEffectInstance.sourceId) {
      const onTurnEndGameEvents = activeEffectInstance.effect.onTurnEnd(activeEffectInstance);
      newPendingGameEvents = newPendingGameEvents.concat(onTurnEndGameEvents);
    }
    const onEveryTurnEndGameEvents = activeEffectInstance.effect.onEveryTurnEnd(activeEffectInstance);
    newPendingGameEvents = newPendingGameEvents.concat(onEveryTurnEndGameEvents);
    return newPendingGameEvents;
  });
  pendingGameEvents.addAll(newPendingGameEventsFromEffects);
  return startTurnReducer(TurnStateTypeEnum.FINISHED);
}

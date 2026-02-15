import { StartTurnResponseStateEvent } from '@events/response-state.event';
import { RequestStateEvent } from '@events/request-state.event';
import { startTurnReducer } from '../../reducers/turn.reducer';
import { GameState, Reducer, TurnStateTypeEnum } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';

export function turnStartResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  startTurnResponseStateEvent: StartTurnResponseStateEvent,
  pendingGameEvents: PriorityListStructure<RequestStateEvent>
): Reducer {
  const robotPlayingId = startTurnResponseStateEvent.turnRobotId;
  const activeEffectInstances = gameCalculator.getActiveEffectInstances(readonlyGameState);
  const newPendingGameEventsFromEffects = activeEffectInstances.flatMap(activeEffectInstance => {
    let newPendingGameEvents: RequestStateEvent[] = [];
    if (robotPlayingId === activeEffectInstance.sourceId) {
      const onTurnStartGameEvents = activeEffectInstance.effect.onTurnStart(activeEffectInstance);
      newPendingGameEvents = newPendingGameEvents.concat(onTurnStartGameEvents);
    }
    const onEveryTurnStartGameEvents = activeEffectInstance.effect.onEveryTurnStart(activeEffectInstance);
    newPendingGameEvents = newPendingGameEvents.concat(onEveryTurnStartGameEvents);
    return newPendingGameEvents;
  });
  pendingGameEvents.addAll(newPendingGameEventsFromEffects);
  return startTurnReducer(TurnStateTypeEnum.STARTED);
}

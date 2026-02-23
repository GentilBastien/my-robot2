import { TurnEndResponseStateEvent } from '@events/response-state.event';
import { RequestStateEvent } from '@events/request-state.event';
import { startTurnReducer } from '../../reducers/turn.reducer';
import { GameState, Reducer, TurnStateTypeEnum } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { EffectTrigger } from '@entities/effects/effect-trigger';

export function turnEndResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  endTurnResponseStateEvent: TurnEndResponseStateEvent,
  pendingGameEvents: PriorityListStructure<RequestStateEvent>
): Reducer {
  const robotPlayingId = endTurnResponseStateEvent.turnRobotId;
  const activeEffectInstances = gameCalculator.getActiveEffectInstances(readonlyGameState);
  const newPendingGameEventsFromEffects = activeEffectInstances.flatMap(effectInstance => {
    let newPendingGameEvents: RequestStateEvent[] = [];
    if (robotPlayingId === effectInstance.sourceId) {
      const onTurnEndGameEvents = effectInstance.effect.handle({
        trigger: EffectTrigger.ON_TURN_END,
        effectInstance,
        readonlyGameState,
        gameCalculator,
      });
      newPendingGameEvents = newPendingGameEvents.concat(onTurnEndGameEvents);
    }
    const onEveryTurnEndGameEvents = effectInstance.effect.handle({
      trigger: EffectTrigger.ON_EVERY_TURN_END,
      effectInstance,
      readonlyGameState,
      gameCalculator,
    });
    newPendingGameEvents = newPendingGameEvents.concat(onEveryTurnEndGameEvents);
    return newPendingGameEvents;
  });
  pendingGameEvents.addAll(newPendingGameEventsFromEffects);
  return startTurnReducer(TurnStateTypeEnum.FINISHED);
}

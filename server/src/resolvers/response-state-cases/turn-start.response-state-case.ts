import { TurnStartResponseStateEvent } from '@events/response-state.event';
import { RequestStateEvent } from '@events/request-state.event';
import { startTurnReducer } from '../../reducers/turn.reducer';
import { GameState, Reducer, TurnStateTypeEnum } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { EffectTrigger } from '@entities/effects/effect-trigger';

export function turnStartResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  turnStartResponseStateEvent: TurnStartResponseStateEvent,
  pendingGameEvents: PriorityListStructure<RequestStateEvent>
): Reducer {
  const robotPlayingId = turnStartResponseStateEvent.turnRobotId;
  const activeEffectInstances = gameCalculator.getActiveEffectInstances(readonlyGameState);
  const newPendingRequestStateEvents = activeEffectInstances.flatMap(effectInstance => {
    let newEffects: RequestStateEvent[] = [];
    if (robotPlayingId === effectInstance.sourceId) {
      const onTurnStartGameEvents = effectInstance.effect.handle({
        trigger: EffectTrigger.ON_TURN_START,
        effectInstance,
        readonlyGameState,
        gameCalculator,
      });
      newEffects = newEffects.concat(onTurnStartGameEvents);
    }
    const onEveryTurnStartGameEvents = effectInstance.effect.handle({
      trigger: EffectTrigger.ON_EVERY_TURN_START,
      effectInstance,
      readonlyGameState,
      gameCalculator,
    });
    newEffects = newEffects.concat(onEveryTurnStartGameEvents);
    return newEffects;
  });
  pendingGameEvents.addAll(newPendingRequestStateEvents);
  return startTurnReducer(TurnStateTypeEnum.STARTED);
}

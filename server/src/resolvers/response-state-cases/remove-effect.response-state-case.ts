import { RemoveEffectResponseStateEvent } from '@events/response-state.event';
import { EffectState, GameState, Reducer } from 'shared';
import { GameCalculator } from '@game/game-calculator/game.calculator';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { RequestStateEvent } from '@events/request-state.event';
import { removeEffectState } from '@reducers/effect.reducer';
import { Effect } from '@entities/effects/effect';
import { EffectTrigger } from '@entities/effects/effect-trigger';

export function removeEffectResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  removeEffectResponseStateEvent: RemoveEffectResponseStateEvent,
  pendingRequestEvents: PriorityListStructure<RequestStateEvent>
): Reducer {
  const effectStateId: string = removeEffectResponseStateEvent.effectStateId;
  const effectState: EffectState = gameCalculator.getEffectStateById(readonlyGameState, effectStateId);
  const effect: Effect = gameCalculator.getEffect(effectState);

  const newEffectsFromApply: RequestStateEvent[] = effect.handle({
    trigger: EffectTrigger.ON_EXPIRE,
    effectState,
    readonlyGameState,
    gameCalculator,
  });

  pendingRequestEvents.addAll(newEffectsFromApply);
  return removeEffectState(effectStateId);
}

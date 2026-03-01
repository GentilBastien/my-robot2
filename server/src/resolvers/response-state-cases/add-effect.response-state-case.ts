import { AddEffectResponseStateEvent } from '@events/response-state.event';
import { EffectState, GameState, Reducer } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { RequestStateEvent } from '@events/request-state.event';
import { addEffectState } from '@reducers/effect.reducer';
import { Effect } from '@entities/effects/effect';
import { EffectTrigger } from '@entities/effects/effect-trigger';

export function addEffectResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  addEffectResponseStateEvent: AddEffectResponseStateEvent,
  pendingGameEvents: PriorityListStructure<RequestStateEvent>
): Reducer {
  const effectState: EffectState = addEffectResponseStateEvent.effectState;
  const effect: Effect = gameCalculator.getEffect(effectState);
  const newEffectsFromApply: RequestStateEvent[] = effect.handle({
    trigger: EffectTrigger.ON_APPLY,
    effectState,
    readonlyGameState,
    gameCalculator,
  });
  pendingGameEvents.addAll(newEffectsFromApply);
  return addEffectState(addEffectResponseStateEvent.effectState);
}

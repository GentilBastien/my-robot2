import { StepPathResponseStateEvent } from '@events/response-state.event';
import { RequestStateEvent } from '@events/request-state.event';
import { EffectState, GameState, Reducer } from 'shared';
import { GameCalculator } from '@game/game-calculator/game.calculator';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { Effect } from '@entities/effects/effect';
import { remainingMovementReducer } from '@reducers/resources.reducer';

export function stepPathResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  stepPathResponseStateEvent: StepPathResponseStateEvent,
  pendingRequestEvents: PriorityListStructure<RequestStateEvent>
): Reducer {
  const newRemainingMove: number =
    gameCalculator.getRobotResourcesState(readonlyGameState, stepPathResponseStateEvent.sourceRobotId).remainingMove -
    stepPathResponseStateEvent.stepPath.cost;
  const effectStatesFromCoordinates: EffectState[] = gameCalculator.getEffectStatesAtCoordinates(
    readonlyGameState,
    stepPathResponseStateEvent.stepPath.endCoordinates
  );
  const newPendingRequestStateEvents: RequestStateEvent[] = effectStatesFromCoordinates.flatMap(effectState => {
    const effect: Effect = gameCalculator.getEffect(effectState);
    return effect.handle({
      trigger: EffectTrigger.ON_APPLY,
      effectState,
      readonlyGameState,
      gameCalculator,
    });
  });
  //TODO: This is wrong, it must add a RequestAddEffect instead of "applying" it right now. here, we don't persist the effect in state
  pendingRequestEvents.addAll(newPendingRequestStateEvents);
  return remainingMovementReducer(stepPathResponseStateEvent.sourceRobotId, newRemainingMove);
}

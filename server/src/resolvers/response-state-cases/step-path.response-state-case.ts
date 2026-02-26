import { StepPathResponseStateEvent } from '@events/response-state.event';
import { RequestStateEvent } from '@events/request-state.event';
import { GameState, Reducer } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { remainingMovementReducer } from '../../reducers/movement.reducer';
import { EffectState } from '../../../../shared/src/states/effect.state';

export function stepPathResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  stepPathResponseStateEvent: StepPathResponseStateEvent,
  pendingGameEvents: PriorityListStructure<RequestStateEvent>
): Reducer {
  const newRemainingMove =
    gameCalculator.getResourcesState(readonlyGameState, stepPathResponseStateEvent.sourceRobotId).remainingMove -
    stepPathResponseStateEvent.stepPath.cost;
  const activeEffectInstances: EffectState[] = gameCalculator.getEffectStatesAtCoordinates(
    readonlyGameState,
    stepPathResponseStateEvent.stepPath.endCoordinates
  );
  const newPendingRequestStateEvents = activeEffectInstances.flatMap(effectInstance => {
    return effectInstance.effect.handle({
      trigger: EffectTrigger.ON_APPLY,
      effectInstance,
      readonlyGameState,
      gameCalculator,
    });
  });
  pendingGameEvents.addAll(newPendingRequestStateEvents);
  return remainingMovementReducer(stepPathResponseStateEvent.sourceRobotId, newRemainingMove);
}

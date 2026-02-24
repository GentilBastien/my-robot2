import { StepPathResponseStateEvent } from '@events/response-state.event';
import { RequestStateEvent } from '@events/request-state.event';
import { GameState, Reducer } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { remainingMovementReducer } from '../../reducers/movement.reducer';

export function stepPathResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  stepPathResponseStateEvent: StepPathResponseStateEvent,
  pendingGameEvents: PriorityListStructure<RequestStateEvent>
): Reducer {
  const newRemainingMove =
    readonlyGameState.robots[stepPathResponseStateEvent.sourceRobotId].resources.remainingMove -
    stepPathResponseStateEvent.stepPath.cost;
  const activeEffectInstances = gameCalculator.getActiveEffectInstancesAtCoordinates(
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

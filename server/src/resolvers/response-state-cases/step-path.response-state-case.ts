import { StepPathResponseStateEvent } from '@events/response-state.event';
import { RequestMovementStateEvent, RequestStateEvent } from '@events/request-state.event';
import { EffectState, GameEventTypeEnum, GameState, Reducer } from 'shared';
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
  const remainingMove: number = gameCalculator.getRobotResourcesState(
    readonlyGameState,
    stepPathResponseStateEvent.sourceRobotId
  ).remainingMove;
  const newRemainingMove: number = remainingMove - stepPathResponseStateEvent.stepPath.cost;
  const effectStatesFromCoordinates: EffectState[] = gameCalculator.getEffectStatesAtCoordinates(
    readonlyGameState,
    stepPathResponseStateEvent.stepPath.endCoordinates
  );
  const requestMovementStateEvent: RequestMovementStateEvent = {
    gameEventType: GameEventTypeEnum.MOVEMENT,
    sourceRobotId: stepPathResponseStateEvent.sourceRobotId,
    coordinates: stepPathResponseStateEvent.stepPath.endCoordinates,
  };
  pendingRequestEvents.add(requestMovementStateEvent);

  const newPendingRequestStateEvents: RequestStateEvent[] = effectStatesFromCoordinates.flatMap(effectState => {
    const effect: Effect = gameCalculator.getEffect(effectState);
    return effect.handle({
      trigger: EffectTrigger.ON_SURFACE,
      effectState,
      coordinates: stepPathResponseStateEvent.stepPath.endCoordinates,
      readonlyGameState,
      gameCalculator,
    });
  });
  pendingRequestEvents.addAll(newPendingRequestStateEvents);
  return remainingMovementReducer(stepPathResponseStateEvent.sourceRobotId, newRemainingMove);
}

import { PathResponseStateEvent } from '@events/response-state.event';
import { RequestStateEvent } from '@events/request-state.event';
import { GameState, Reducer } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { remainingMovementReducer } from '../../reducers/movement.reducer';
import { EffectTrigger } from '@entities/effects/effect-trigger';

export function movementResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  pathResponseStateEvent: PathResponseStateEvent,
  pendingGameEvents: PriorityListStructure<RequestStateEvent>
): Reducer {
  const newRemainingMove =
    readonlyGameState.robots[pathResponseStateEvent.sourceRobotId].resources.remainingMove -
    pathResponseStateEvent.stepPath.cost;
  const activeEffectInstances = gameCalculator.getActiveEffectInstancesAtCoordinates(
    readonlyGameState,
    pathResponseStateEvent.stepPath.endCoordinates
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
  return remainingMovementReducer(pathResponseStateEvent.sourceRobotId, newRemainingMove);
}

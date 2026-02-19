import { MoveResponseStateEvent } from '@events/response-state.event';
import { RequestStateEvent } from '@events/request-state.event';
import { GameState, Reducer } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { remainingMovementReducer } from '../../reducers/movement.reducer';

export function movementResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  moveResponseStateEvent: MoveResponseStateEvent,
  pendingGameEvents: PriorityListStructure<RequestStateEvent>
): Reducer {
  const newRemainingMove =
    readonlyGameState.robots[moveResponseStateEvent.sourceRobotId].resources.remainingMove -
    moveResponseStateEvent.path.cost;
  const activeEffectInstances = gameCalculator.getActiveEffectInstancesInPath(
    readonlyGameState,
    moveResponseStateEvent.path
  );
  const newPendingRequestStateEvents = activeEffectInstances.flatMap(effectInstance => {
    return effectInstance.effect.onApply(effectInstance);
  });
  pendingGameEvents.addAll(newPendingRequestStateEvents);
  return remainingMovementReducer(moveResponseStateEvent.sourceRobotId, newRemainingMove);
}

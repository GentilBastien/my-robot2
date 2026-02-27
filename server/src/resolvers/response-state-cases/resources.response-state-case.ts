import { ResourcesResponseStateEvent } from '@events/response-state.event';
import { GameState, Reducer, ResourcesState } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { updateResourcesState } from '@reducers/resources.reducer';

export function resourcesResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  resourcesResponseStateEvent: ResourcesResponseStateEvent
  // pendingGameEvents: PriorityListStructure<RequestStateEvent>
): Reducer {
  const resourcesState: ResourcesState = gameCalculator.getResourcesState(
    readonlyGameState,
    resourcesResponseStateEvent.sourceRobotId
  );

  const newResourcesState: ResourcesState = {
    ...resourcesState,
  };
  return updateResourcesState(resourcesResponseStateEvent.sourceRobotId, newResourcesState);
}

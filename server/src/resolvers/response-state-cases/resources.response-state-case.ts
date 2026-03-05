import { ResourcesResponseStateEvent } from '@events/response-state.event';
import { GameState, Reducer, ResourcesState } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { updateResourcesState } from '@reducers/resources.reducer';

export function resourcesResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  resourcesResponseStateEvent: ResourcesResponseStateEvent
): Reducer {
  const resourcesState: ResourcesState = gameCalculator.getRobotResourcesState(
    readonlyGameState,
    resourcesResponseStateEvent.sourceRobotId
  );

  //TODO resources at turn end
  const newResourcesState: ResourcesState = {
    ...resourcesState,
  };
  return updateResourcesState(resourcesResponseStateEvent.sourceRobotId, newResourcesState);
}

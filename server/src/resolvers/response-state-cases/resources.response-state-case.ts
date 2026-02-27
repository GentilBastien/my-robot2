import { ResourcesResponseStateEvent } from '@events/response-state.event';
import { GameState, Reducer } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { healthPointReducer } from '@reducers/resources.reducer';

export function resourcesResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  resourcesResponseStateEvent: ResourcesResponseStateEvent
  // pendingGameEvents: PriorityListStructure<RequestStateEvent>
): Reducer {
  console.log(resourcesResponseStateEvent);
  //TODO: resources state
  return healthPointReducer(resourcesResponseStateEvent.sourceRobotId, 2);
}

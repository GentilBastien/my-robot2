import { RequestResourcesStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum, GameState } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { ResourcesResponseStateEvent } from '@events/response-state.event';

export function resourcesRequestStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  requestResourcesStateEvent: RequestResourcesStateEvent
): ResourcesResponseStateEvent {
  return {
    gameEventType: GameEventTypeEnum.RESOURCES,
    responseValidated: true,
    sourceRobotId: requestResourcesStateEvent.sourceRobotId,
  };
}

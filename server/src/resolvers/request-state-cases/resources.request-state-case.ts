import { RequestResourcesStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum } from 'shared';
import { ResourcesResponseStateEvent } from '@events/response-state.event';

export function resourcesRequestStateCase(
  requestResourcesStateEvent: RequestResourcesStateEvent
): ResourcesResponseStateEvent {
  return {
    gameEventType: GameEventTypeEnum.RESOURCES,
    responseValidated: true,
    sourceRobotId: requestResourcesStateEvent.sourceRobotId,
  };
}

import { GameEventTypeEnum } from 'shared';
import { MovementResponseStateEvent } from '@events/response-state.event';
import { RequestMovementStateEvent } from '@events/request-state.event';

export function movementRequestStateCase(
  requestMovementStateEvent: RequestMovementStateEvent
): MovementResponseStateEvent {
  return {
    gameEventType: GameEventTypeEnum.MOVEMENT,
    responseValidated: true,
    coordinates: requestMovementStateEvent.coordinates,
    sourceRobotId: requestMovementStateEvent.sourceRobotId,
  };
}

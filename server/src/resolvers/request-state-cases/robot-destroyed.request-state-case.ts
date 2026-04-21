import { RequestRobotDestroyedStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum } from 'shared';
import { RobotDestroyedResponseStateEvent } from '@events/response-state.event';

export function robotDestroyedRequestStateCase(
  requestRobotDestroyedStateEvent: RequestRobotDestroyedStateEvent
): RobotDestroyedResponseStateEvent {
  return {
    gameEventType: GameEventTypeEnum.ROBOT_DESTROYED,
    responseValidated: true,
    sourceRobotId: requestRobotDestroyedStateEvent.sourceRobotId,
    targetRobotId: requestRobotDestroyedStateEvent.targetRobotId,
    cause: requestRobotDestroyedStateEvent.cause,
    actionTypeEnum: requestRobotDestroyedStateEvent.actionTypeEnum,
  };
}

import { RequestPathStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum, PathGameEvent } from 'shared';

export function pathGameCase(pathGameEvent: PathGameEvent): RequestPathStateEvent {
  return {
    gameEventType: GameEventTypeEnum.PATH,
    movementType: pathGameEvent.movementType,
    sourceRobotId: pathGameEvent.sourceRobotId,
    path: pathGameEvent.path,
  };
}

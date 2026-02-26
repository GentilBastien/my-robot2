import { RequestPathStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum } from 'shared';
import { PathGameEvent } from '@events/game.event';

export function pathGameCase(pathGameEvent: PathGameEvent): RequestPathStateEvent {
  return {
    gameEventType: GameEventTypeEnum.PATH,
    movementType: pathGameEvent.movementType,
    sourceRobotId: pathGameEvent.sourceRobotId,
    path: pathGameEvent.path,
  };
}

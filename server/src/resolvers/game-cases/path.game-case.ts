import { RequestPathStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum } from 'shared';
import { PathGameEvent } from '@events/game.event';

export function pathGameCase(movementGameEvent: PathGameEvent): RequestPathStateEvent {
  if ('stepPath' in movementGameEvent) {
    throw 'normalement les stepPath pas dans les gameEvent';
  }
  return {
    gameEventType: GameEventTypeEnum.PATH,
    movementType: movementGameEvent.movementType,
    sourceRobotId: movementGameEvent.sourceRobotId,
    path: movementGameEvent.path,
  };
}

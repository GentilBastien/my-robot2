import { RequestManaStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum } from 'shared';
import { ManaResponseStateEvent } from '@events/response-state.event';

export function manaRequestStateCase(requestManaStateEvent: RequestManaStateEvent): ManaResponseStateEvent {
  return {
    gameEventType: GameEventTypeEnum.MANA,
    responseValidated: true,
    sourceRobotId: requestManaStateEvent.sourceRobotId,
    value: requestManaStateEvent.value,
  };
}

import { RequestHpStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum } from 'shared';
import { HpResponseStateEvent } from '@events/response-state.event';

export function hpRequestStateCase(requestHpStateEvent: RequestHpStateEvent): HpResponseStateEvent {
  return {
    gameEventType: GameEventTypeEnum.HP,
    responseValidated: true,
    sourceRobotId: requestHpStateEvent.sourceRobotId,
    value: requestHpStateEvent.value,
  };
}

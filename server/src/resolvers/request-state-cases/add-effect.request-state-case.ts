import { RequestAddEffectStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum } from 'shared';
import { AddEffectResponseStateEvent } from '@events/response-state.event';

export function addEffectRequestStateCase(
  requestAddEffectStateEvent: RequestAddEffectStateEvent
): AddEffectResponseStateEvent {
  return {
    gameEventType: GameEventTypeEnum.ADD_EFFECT,
    responseValidated: true,
    sourceRobotId: requestAddEffectStateEvent.sourceRobotId,
    effectState: requestAddEffectStateEvent.effectState,
  };
}

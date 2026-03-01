import { RequestRemoveEffectStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum } from 'shared';
import { RemoveEffectResponseStateEvent } from '@events/response-state.event';

export function removeEffectRequestStateCase(
  requestRemoveEffectStateEvent: RequestRemoveEffectStateEvent
): RemoveEffectResponseStateEvent {
  return {
    gameEventType: GameEventTypeEnum.REMOVE_EFFECT,
    responseValidated: true,
    sourceRobotId: requestRemoveEffectStateEvent.sourceRobotId,
    effectStateId: requestRemoveEffectStateEvent.effectStateId,
  };
}

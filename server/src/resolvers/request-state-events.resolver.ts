import { Game } from '../states/game';
import { RequestStateEvent } from '../events/request-state-event';
import { StateEventTypeEnum } from 'shared';
import { ResponseStateEvent } from '../events/response-state-event';

export function resolveRequestStateEvent(game: Game, requestStateEvent: RequestStateEvent): ResponseStateEvent[] {
  switch (requestStateEvent.stateEventType) {
    case StateEventTypeEnum.DAMAGE: {
      return [];
    }
    case StateEventTypeEnum.HEAL: {
      return [];
    }
    case StateEventTypeEnum.MOVEMENT: {
      return [];
    }
    //...
    default:
      return [];
  }
}

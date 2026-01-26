import { GameState } from '@states/game-state';
import { RequestStateEvent } from '@events/request-state.event';
import { StateEventTypeEnum } from 'shared';
import { ResponseStateEvent } from '@events/response-state.event';
import { GameEvent } from '@events/game.events';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';

export class RequestStateEventResolver {
  public static resolve(
    readonlyGameState: Readonly<GameState>,
    requestStateEvent: RequestStateEvent,
    pendingGameEvents: PriorityListStructure<GameEvent>
  ): ResponseStateEvent | null {
    switch (requestStateEvent.stateEventType) {
      case StateEventTypeEnum.DAMAGE: {
        return null;
      }
      case StateEventTypeEnum.HEAL: {
        return null;
      }
      case StateEventTypeEnum.MOVEMENT: {
        return null;
      }
      //...
      default:
        return null;
    }
  }
}

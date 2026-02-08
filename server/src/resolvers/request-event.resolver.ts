import { GameState } from '@states/game.state';
import { RequestEvent } from '@events/request.event';
import { DamageResponseEvent, ResponseEvent } from '@events/response.event';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { GameEventTypeEnum } from 'shared';
import { GameCalculator } from '../game/game-calculator/game.calculator';

export class RequestEventResolver {
  public static resolve(
    gameCalculator: GameCalculator,
    readonlyGameState: Readonly<GameState>,
    requestEvent: RequestEvent,
    pendingRequestEvents: PriorityListStructure<RequestEvent>
  ): ResponseEvent {
    // switch (requestEvent.gameEventType) {
    //   case GameEventTypeEnum.ACTION: {
    //     return null;
    //   }
    //   //...
    //   default:
    //     return null;
    // }
    return {
      gameEventType: GameEventTypeEnum.ADVANCE_TURN,
    } as DamageResponseEvent;
  }
}

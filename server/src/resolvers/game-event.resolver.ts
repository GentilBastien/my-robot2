import { GameState } from '@states/game.state';
import { RequestEvent } from '@events/request.event';
import { GameEventTypeEnum } from 'shared';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { GameCalculator } from '../game/game-calculator/game.calculator';

export class GameEventResolver {
  public static resolve(
    gameCalculator: GameCalculator,
    readonlyGameState: Readonly<GameState>,
    gameEventTypeEnum: GameEventTypeEnum,
    pendingRequestEvents: PriorityListStructure<RequestEvent>
  ): RequestEvent {
    // switch (gameEventTypeEnum) {
    //   Case GameEventTypeEnum 1
    //   Case GameEventTypeEnum 2
    //   Case GameEventTypeEnum 3
    // }
    return {
      gameEventType: GameEventTypeEnum.ADVANCE_TURN,
      priority: 1,
    };
  }
}

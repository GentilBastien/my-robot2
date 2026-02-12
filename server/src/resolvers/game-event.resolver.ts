import { RequestAdvanceTurnEvent, RequestEvent } from '@events/request.event';
import { GameEventTypeEnum, GameState } from 'shared';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { GameCalculator } from '../game/game-calculator/game.calculator';

export class GameEventResolver {
  public static resolve(
    gameCalculator: GameCalculator,
    readonlyGameState: Readonly<GameState>,
    gameEventType: GameEventTypeEnum,
    pendingRequestEvents: PriorityListStructure<RequestEvent>
  ): RequestEvent {
    switch (gameEventType) {
      case GameEventTypeEnum.ADVANCE_TURN: {
        const playingRobotId = gameCalculator.getRobotPlayingId();
        const requestAdvanceTurnEvent: RequestAdvanceTurnEvent = {
          gameEventType: GameEventTypeEnum.ADVANCE_TURN,
          sourceRobotId: playingRobotId,
          priority: 1,
        };
        return requestAdvanceTurnEvent as RequestAdvanceTurnEvent;
      }
      default:
        throw new Error('GameEventResolver, unknown gameEventType');
    }
  }
}

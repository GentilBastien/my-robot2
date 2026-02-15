import {
  RequestAdvanceTurnStateEvent,
  RequestStateEvent,
  RequestTurnStartStateEvent,
} from '@events/request-state.event';
import { ActionEventTypeEnum, GameEventTypeEnum, GameState } from 'shared';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { GameCalculator } from '../game/game-calculator/game.calculator';
import { GameEvent } from '@events/game.event';
import { ActionRequestStateEvent } from '@events/action-request-state.event';

export class GameEventResolver {
  public static resolve(
    gameCalculator: GameCalculator,
    readonlyGameState: Readonly<GameState>,
    gameEvent: GameEvent,
    pendingRequestEvents: PriorityListStructure<RequestStateEvent>
  ): RequestStateEvent {
    switch (gameEvent.gameEventType) {
      case GameEventTypeEnum.TURN_START: {
        const requestTurnStartStateEvent: RequestTurnStartStateEvent = {
          gameEventType: GameEventTypeEnum.TURN_START,
          sourceRobotId: gameEvent.sourceRobotId,
          priority: 1,
        };
        return requestTurnStartStateEvent as RequestTurnStartStateEvent;
      }
      case GameEventTypeEnum.TURN_END:
      case GameEventTypeEnum.ROBOT_DESTROYED:
      case GameEventTypeEnum.ROBOT_JOINED:
      case GameEventTypeEnum.ADVANCE_TURN: {
        const requestAdvanceTurnEvent: RequestAdvanceTurnStateEvent = {
          gameEventType: GameEventTypeEnum.ADVANCE_TURN,
          sourceRobotId: gameEvent.sourceRobotId,
          priority: 1,
        };
        return requestAdvanceTurnEvent as RequestAdvanceTurnStateEvent;
      }

      case GameEventTypeEnum.ACTION: {
        const actionEventTypeEnum: ActionEventTypeEnum | undefined = gameEvent.actionEventTypeEnum;
        if (actionEventTypeEnum === undefined) {
          throw 'Temp error, actionEventTypeEnum must be defined if GameEventTypeEnum is ACTION';
        }
        const temp: ActionRequestStateEvent = {
          gameEventType: gameEvent.gameEventType,
          actionEventTypeEnum: actionEventTypeEnum,
          sourceRobotId: gameEvent.sourceRobotId,
        };
        switch (actionEventTypeEnum) {
          case ActionEventTypeEnum.AUTO_ATTACK:
            break;
          case ActionEventTypeEnum.THROW_PLASMA_GRENADE:
            break;
          case ActionEventTypeEnum.THROW_EMP_GRENADE:
            break;
          default:
            throw 'Temp error, invalid actionEventTypeEnum';
        }
      }
      // eslint-disable-next-line no-fallthrough
      default:
        throw new Error('GameEventResolver, unknown gameEventType');
    }
  }
}

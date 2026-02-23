import { RequestStateEvent } from '@events/request-state.event';
import { ActionEventTypeEnum, GameEventTypeEnum } from 'shared';
import { GameEvent, MovementGameEvent } from '@events/game.event';
import { turnStartGameCase } from '@resolvers/game-cases/turn-start.game-case';
import { turnEndGameCase } from '@resolvers/game-cases/turn-end.game-case';
import { advanceTurnGameCase } from '@resolvers/game-cases/advance-turn.game-case';
import { movementGameCase } from '@resolvers/game-cases/movement.game-case';

export function gameEventResolver(gameEvent: GameEvent): RequestStateEvent {
  switch (gameEvent.gameEventType) {
    case GameEventTypeEnum.TURN_START: {
      return turnStartGameCase(gameEvent);
    }
    case GameEventTypeEnum.TURN_END: {
      return turnEndGameCase(gameEvent);
    }
    case GameEventTypeEnum.ADVANCE_TURN: {
      return advanceTurnGameCase(gameEvent);
    }
    case GameEventTypeEnum.MOVEMENT: {
      return movementGameCase(gameEvent as MovementGameEvent);
    }
    case GameEventTypeEnum.ACTION: {
      const actionEventTypeEnum: ActionEventTypeEnum | undefined = gameEvent.actionEventTypeEnum;
      if (actionEventTypeEnum === undefined) {
        throw 'Temp error, actionEventTypeEnum must be defined if GameEventTypeEnum is ACTION';
      }
      // const temp: ActionRequestStateEvent = {
      //   gameEventType: gameEvent.gameEventType,
      //   actionEventTypeEnum: actionEventTypeEnum,
      //   sourceRobotId: gameEvent.sourceRobotId,
      // };
      switch (actionEventTypeEnum) {
        case ActionEventTypeEnum.AUTO_ATTACK:
          return [];
        case ActionEventTypeEnum.THROW_PLASMA_GRENADE:
          return [];
        case ActionEventTypeEnum.THROW_EMP_GRENADE:
          return [];
        default:
          throw 'Temp error, invalid actionEventTypeEnum';
      }
    }
    default:
      throw new Error('GameEventResolver, unknown gameEventType');
  }
}

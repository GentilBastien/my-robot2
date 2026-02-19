import {
  RequestAdvanceTurnStateEvent,
  RequestMoveStateEvent,
  RequestStateEvent,
  RequestTurnEndStateEvent,
  RequestTurnStartStateEvent,
} from '@events/request-state.event';
import { ActionEventTypeEnum, GameEventTypeEnum } from 'shared';
import { GameEvent, MovementGameEvent } from '@events/game.event';

export function gameEventResolver(
  // gameCalculator: GameCalculator,
  // readonlyGameState: Readonly<GameState>,
  gameEvent: GameEvent
): RequestStateEvent[] {
  switch (gameEvent.gameEventType) {
    case GameEventTypeEnum.TURN_START: {
      const requestTurnStartStateEvent: RequestTurnStartStateEvent = {
        gameEventType: GameEventTypeEnum.TURN_START,
        sourceRobotId: gameEvent.sourceRobotId,
        priority: 3,
      };
      return [requestTurnStartStateEvent];
    }
    case GameEventTypeEnum.TURN_END: {
      const requestTurnEndStateEvent: RequestTurnEndStateEvent = {
        gameEventType: GameEventTypeEnum.TURN_END,
        sourceRobotId: gameEvent.sourceRobotId,
        priority: 1,
      };
      const requestAdvanceTurnEvent: RequestAdvanceTurnStateEvent = {
        gameEventType: GameEventTypeEnum.ADVANCE_TURN,
        sourceRobotId: gameEvent.sourceRobotId,
        priority: 2,
      };
      return [requestTurnEndStateEvent, requestAdvanceTurnEvent];
    }
    case GameEventTypeEnum.ADVANCE_TURN: {
      const requestAdvanceTurnEvent: RequestAdvanceTurnStateEvent = {
        gameEventType: GameEventTypeEnum.ADVANCE_TURN,
        sourceRobotId: gameEvent.sourceRobotId,
        priority: 2,
      };
      const requestTurnStartStateEvent: RequestTurnStartStateEvent = {
        gameEventType: GameEventTypeEnum.TURN_START,
        sourceRobotId: gameEvent.sourceRobotId,
        priority: 3,
      };
      return [requestAdvanceTurnEvent, requestTurnStartStateEvent];
    }
    case GameEventTypeEnum.MOVEMENT: {
      const movementGameEvent: MovementGameEvent = gameEvent as MovementGameEvent;
      const requestMoveStateEvent: RequestMoveStateEvent = {
        gameEventType: GameEventTypeEnum.MOVEMENT,
        priority: 100,
        sourceRobotId: gameEvent.sourceRobotId,
        path: movementGameEvent.path,
      };
      return [requestMoveStateEvent];
    }
    case GameEventTypeEnum.ROBOT_DESTROYED:
      return [];
    case GameEventTypeEnum.ROBOT_JOINED:
      return [];
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

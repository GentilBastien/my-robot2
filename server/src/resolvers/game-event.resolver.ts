import {
  RequestAdvanceTurnStateEvent,
  RequestMoveStateEvent,
  RequestStateEvent,
  RequestTurnEndStateEvent,
  RequestTurnStartStateEvent,
} from '@events/request-state.event';
import { ActionEventTypeEnum, GameEventTypeEnum, MovementTypeEnum, StepPathCoordinate } from 'shared';
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
      const basePriorityMovement = 10;

      switch (movementGameEvent.movementType) {
        case MovementTypeEnum.JUMPED:
          return [];
        case MovementTypeEnum.HOVERED:
        case MovementTypeEnum.WALKED:
        default: {
          const requestStepMoveStateEvents: RequestMoveStateEvent[] = [];
          const path = movementGameEvent.path;
          for (let i = 0; i < path.coordinatesPath.length - 1; i++) {
            const startCoordinates = path.coordinatesPath[i];
            const endCoordinates = path.coordinatesPath[i + 1];
            const stepCost = path.costs[i + 1];
            const stepPathCoordinate: StepPathCoordinate = {
              startCoordinates,
              endCoordinates,
              cost: stepCost,
            };
            const requestStepMoveStateEvent: RequestMoveStateEvent = {
              gameEventType: GameEventTypeEnum.MOVEMENT,
              movementType: movementGameEvent.movementType,
              priority: basePriorityMovement + i,
              sourceRobotId: movementGameEvent.sourceRobotId,
              stepPath: stepPathCoordinate,
            };
            requestStepMoveStateEvents.push(requestStepMoveStateEvent);
          }
          return requestStepMoveStateEvents;
        }
      }
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

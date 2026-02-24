import { RequestPathStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum, GameState } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { StepPathResponseStateEvent } from '@events/response-state.event';

export function pathRequestStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  requestPathStateEvent: RequestPathStateEvent
): StepPathResponseStateEvent {
  const isRobotTurn = gameCalculator.isRobotTurn(readonlyGameState, requestPathStateEvent.sourceRobotId);
  const enoughRemainingMovement =
    gameCalculator.getRobotState(readonlyGameState, requestPathStateEvent.sourceRobotId).resources.remainingMove >=
    gameCalculator.getPathCoordinateCost(requestPathStateEvent.path);
  return {
    // TODO this commented code should be in an other resolver
    // const basePriorityMovement = 10;
    // switch (movementGameEvent.movementType) {
    //   case MovementTypeEnum.JUMPED:
    //   case MovementTypeEnum.TELEPORTED: {
    //     const requestStepMoveStateEvent: RequestMoveStateEvent = {
    //       gameEventType: GameEventTypeEnum.MOVEMENT,
    //       movementType: movementGameEvent.movementType,
    //       sourceRobotId: movementGameEvent.sourceRobotId,
    //       priority: basePriorityMovement,
    //       stepPath: {
    //         startCoordinates: movementGameEvent.path.coordinatesPath[0],
    //         endCoordinates: movementGameEvent.path.coordinatesPath[1],
    //         cost: movementGameEvent.path.costs[1],
    //       },
    //     };
    //     return [requestStepMoveStateEvent];
    //   }
    //   case MovementTypeEnum.HOVERED:
    //   case MovementTypeEnum.WALKED:
    //   default: {
    //     const requestStepMoveStateEvents: RequestMoveStateEvent[] = [];
    //     const path: PathCoordinate = movementGameEvent.path;
    //     for (let i = 0; i < path.coordinatesPath.length - 1; i++) {
    //       const startCoordinates = path.coordinatesPath[i];
    //       const endCoordinates = path.coordinatesPath[i + 1];
    //       const stepCost = path.costs[i + 1];
    //       const stepPathCoordinate: StepPathCoordinate = {
    //         startCoordinates,
    //         endCoordinates,
    //         cost: stepCost,
    //       };
    //       const requestStepMoveStateEvent: RequestMoveStateEvent = {
    //         gameEventType: GameEventTypeEnum.MOVEMENT,
    //         movementType: movementGameEvent.movementType,
    //         priority: basePriorityMovement + i,
    //         sourceRobotId: movementGameEvent.sourceRobotId,
    //         stepPath: stepPathCoordinate,
    //       };
    //       requestStepMoveStateEvents.push(requestStepMoveStateEvent);
    //     }
    //     return requestStepMoveStateEvents;
    //   }
    // }
    gameEventType: GameEventTypeEnum.STEP_PATH,
    responseValidated: isRobotTurn && enoughRemainingMovement,
    sourceRobotId: requestPathStateEvent.sourceRobotId,
    stepPath: requestPathStateEvent.path,
  };
}

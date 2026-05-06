import { RequestPathStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum, GameState, PathCostCoordinate } from 'shared';
import { GameCalculator } from '@game/game-calculator/game.calculator';
import { PathResponseStateEvent } from '@events/response-state.event';

export function pathRequestStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  requestPathStateEvent: RequestPathStateEvent
): PathResponseStateEvent {
  const robotId: string = requestPathStateEvent.sourceRobotId;
  const isRobotTurn = gameCalculator.isRobotTurn(robotId);
  const pathWithCosts: PathCostCoordinate = gameCalculator.mapPathToPathWithCost(requestPathStateEvent.path);
  const pathCost: number = gameCalculator.getPathCoordinateCost(pathWithCosts);
  const robotRemainingMove = gameCalculator.getRobotState(readonlyGameState, robotId).resources.remainingMove;
  const enoughRemainingMovement = robotRemainingMove >= pathCost;
  const movementTypeAllowed: boolean = gameCalculator.movementTypeAllowedForRobot(
    readonlyGameState,
    robotId,
    requestPathStateEvent.movementType
  );
  return {
    gameEventType: GameEventTypeEnum.PATH,
    movementType: requestPathStateEvent.movementType,
    responseValidated: isRobotTurn && enoughRemainingMovement && movementTypeAllowed,
    sourceRobotId: requestPathStateEvent.sourceRobotId,
    path: pathWithCosts,
  };
}

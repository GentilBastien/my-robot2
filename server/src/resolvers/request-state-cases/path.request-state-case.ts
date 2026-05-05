import { RequestPathStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum, GameState } from 'shared';
import { GameCalculator } from '@game/game-calculator/game.calculator';
import { PathResponseStateEvent } from '@events/response-state.event';

export function pathRequestStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  requestPathStateEvent: RequestPathStateEvent
): PathResponseStateEvent {
  const isRobotTurn = gameCalculator.isRobotTurn(requestPathStateEvent.sourceRobotId);
  const enoughRemainingMovement =
    gameCalculator.getRobotState(readonlyGameState, requestPathStateEvent.sourceRobotId).resources.remainingMove >=
    gameCalculator.getPathCoordinateCost(requestPathStateEvent.path);
  //TODO: check if movementType is allowed by the robot
  return {
    gameEventType: GameEventTypeEnum.PATH,
    movementType: requestPathStateEvent.movementType,
    responseValidated: isRobotTurn && enoughRemainingMovement,
    sourceRobotId: requestPathStateEvent.sourceRobotId,
    path: requestPathStateEvent.path,
  };
}

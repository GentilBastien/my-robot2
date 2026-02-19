import { RequestMoveStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum, GameState } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { MoveResponseStateEvent } from '@events/response-state.event';

export function movementRequestStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  requestMoveStateEvent: RequestMoveStateEvent
): MoveResponseStateEvent {
  const isRobotTurn = gameCalculator.isRobotTurn(readonlyGameState, requestMoveStateEvent.sourceRobotId);
  const enoughRemainingMovement =
    gameCalculator.getRobotState(readonlyGameState, requestMoveStateEvent.sourceRobotId).resources.remainingMove >=
    requestMoveStateEvent.path.cost;
  //TODO make a move divided by each movement cell so they may been cancelled
  return {
    gameEventType: GameEventTypeEnum.MOVEMENT,
    responseValidated: isRobotTurn && enoughRemainingMovement,
    sourceRobotId: requestMoveStateEvent.sourceRobotId,
    path: requestMoveStateEvent.path,
  };
}

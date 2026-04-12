import { RequestStepPathStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum, GameState } from 'shared';
import { GameCalculator } from '@game/game-calculator/game.calculator';
import { StepPathResponseStateEvent } from '@events/response-state.event';

export function stepPathRequestStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  requestStepPathStateEvent: RequestStepPathStateEvent
): StepPathResponseStateEvent {
  const isRobotTurn = gameCalculator.isRobotTurn(readonlyGameState, requestStepPathStateEvent.sourceRobotId);
  const enoughRemainingMovement =
    gameCalculator.getRobotState(readonlyGameState, requestStepPathStateEvent.sourceRobotId).resources.remainingMove >=
    requestStepPathStateEvent.stepPath.cost;
  return {
    gameEventType: GameEventTypeEnum.STEP_PATH,
    movementType: requestStepPathStateEvent.movementType,
    responseValidated: isRobotTurn && enoughRemainingMovement,
    sourceRobotId: requestStepPathStateEvent.sourceRobotId,
    stepPath: requestStepPathStateEvent.stepPath,
  };
}

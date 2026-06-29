import { RequestEvent } from '@events/request.event';
import { ContextEvent } from '@events/context.event';
import { StepPathResponseEvent } from '@events/step-path/step-path.response-event';
import { MovementTypeEnum, StepPathCostCoordinate } from 'shared';
import { robotCalculator } from '@calculators/robot.calculator';

export class StepPathRequestEvent implements RequestEvent {
  sourceRobotId: string;
  movementType: MovementTypeEnum;
  stepPath: StepPathCostCoordinate;

  constructor(sourceRobotId: string, movementType: MovementTypeEnum, stepPath: StepPathCostCoordinate) {
    this.sourceRobotId = sourceRobotId;
    this.movementType = movementType;
    this.stepPath = stepPath;
  }

  public mapToResponse(context: ContextEvent): StepPathResponseEvent {
    const isRobotTurn = context.gameCalculator.isRobotTurn(this.sourceRobotId);
    const enoughRemainingMovement =
      robotCalculator.getRobotState(context.gameState, this.sourceRobotId).resources.remainingMove >=
      this.stepPath.cost;
    return new StepPathResponseEvent({
      movementType: this.movementType,
      responseValidated: isRobotTurn && enoughRemainingMovement,
      sourceRobotId: this.sourceRobotId,
      stepPath: this.stepPath,
    });
  }
}

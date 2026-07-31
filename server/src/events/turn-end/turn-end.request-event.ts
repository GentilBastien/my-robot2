import { RequestEvent } from '@events/request.event';
import { ContextEvent } from '@events/context.event';
import { TurnEndResponseEvent } from '@events/turn-end/turn-end.response-event';
import { TurnCalculator } from '@calculators/turn.calculator';
import { RobotCalculator } from '@calculators/robot.calculator';

export class TurnEndRequestEvent implements RequestEvent {
  sourceRobotId: string;

  constructor(sourceRobotId: string) {
    this.sourceRobotId = sourceRobotId;
  }

  public mapToResponse(context: ContextEvent): TurnEndResponseEvent {
    const allowed = RobotCalculator.isRobotTurn(context, this.sourceRobotId);
    const turnNumber = TurnCalculator.getTurnNumber(context);
    const turnRobotId = TurnCalculator.getPlayingRobotId(context);

    return new TurnEndResponseEvent({
      sourceRobotId: this.sourceRobotId,
      responseValidated: allowed,
      turnNumber,
      turnRobotId,
    });
  }
}

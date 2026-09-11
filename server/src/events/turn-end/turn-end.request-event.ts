import { RequestEvent } from '@events/request.event';
import { EventContext } from '@events/context.event';
import { TurnEndResponseEvent } from '@events/turn-end/turn-end.response-event';
import { RobotCalculator } from '@calculators/robot.calculator';

export class TurnEndRequestEvent implements RequestEvent {
  sourceRobotId: string;

  constructor(sourceRobotId: string) {
    this.sourceRobotId = sourceRobotId;
  }

  public mapToResponse(context: EventContext): TurnEndResponseEvent {
    const allowed = RobotCalculator.isRobotTurn(context, this.sourceRobotId);

    return new TurnEndResponseEvent({
      sourceRobotId: this.sourceRobotId,
      responseValidated: allowed,
    });
  }
}

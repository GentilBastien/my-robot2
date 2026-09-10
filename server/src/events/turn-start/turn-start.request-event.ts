import { RequestEvent } from '@events/request.event';
import { ContextEvent } from '@events/context.event';
import { TurnStartResponseEvent } from '@events/turn-start/turn-start.response-event';
import { TurnCalculator } from '@calculators/turn.calculator';

export class TurnStartRequestEvent implements RequestEvent {
  sourceRobotId: string;

  constructor(sourceRobotId: string) {
    this.sourceRobotId = sourceRobotId;
  }

  public mapToResponse(context: ContextEvent): TurnStartResponseEvent {
    const allowed = TurnCalculator.getPlayingRobotId(context) === this.sourceRobotId;

    return new TurnStartResponseEvent({
      sourceRobotId: this.sourceRobotId,
      responseValidated: allowed,
    });
  }
}

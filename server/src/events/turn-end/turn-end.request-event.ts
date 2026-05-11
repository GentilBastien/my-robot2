import { RequestEvent } from '@events/request.event';
import { ContextEvent } from '@events/context.event';
import { TurnEndResponseEvent } from '@events/turn-end/turn-end.response-event';

export class TurnEndRequestEvent implements RequestEvent {
  sourceRobotId: string;

  constructor(sourceRobotId: string) {
    this.sourceRobotId = sourceRobotId;
  }

  public mapToResponse(context: ContextEvent): TurnEndResponseEvent {
    const allowed = context.gameCalculator.isRobotTurn(this.sourceRobotId);
    const turnNumber = context.gameCalculator.getTurnNumber(context.gameState);
    const turnRobotId = context.gameCalculator.getPlayingRobotId();

    return new TurnEndResponseEvent({
      sourceRobotId: this.sourceRobotId,
      responseValidated: allowed,
      turnNumber,
      turnRobotId,
    });
  }
}

import { RequestEvent } from '@events/request.event';
import { ContextEvent } from '@events/context.event';
import { TurnStartResponseEvent } from '@events/turn-start/turn-start.response-event';

export class TurnStartRequestEvent implements RequestEvent {
  sourceRobotId: string;

  constructor(sourceRobotId: string) {
    this.sourceRobotId = sourceRobotId;
  }

  public mapToResponse(context: ContextEvent): TurnStartResponseEvent {
    //sourceRobotId of requestTurnStartStateEvent is the id of the robot that previously played.
    const newTurnState = context.gameCalculator.newTurnState(context.gameState);
    // const allowed = newTurnState.currentTurnRobotId === requestTurnStartStateEvent.sourceRobotId;
    const allowed = true;
    return new TurnStartResponseEvent({
      sourceRobotId: this.sourceRobotId,
      responseValidated: allowed,
      turnNumber: newTurnState.currentTurnNumber,
      turnRobotId: newTurnState.currentTurnRobotId,
    });
  }
}

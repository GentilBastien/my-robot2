import { RequestEvent } from '@events/request.event';
import { ContextEvent } from '@events/context.event';
import { RobotDestroyedResponseEvent } from '@events/robot-destroyed/robot-destroyed.response-event';
import { ActionTypeEnum } from 'shared';

export class RobotDestroyedRequestEvent implements RequestEvent {
  sourceRobotId: string;
  targetRobotId: string;
  actionType: ActionTypeEnum;
  cause: string;

  constructor(sourceRobotId: string, targetRobotId: string, actionTypeEnum: ActionTypeEnum, cause: string) {
    this.sourceRobotId = sourceRobotId;
    this.targetRobotId = targetRobotId;
    this.actionType = actionTypeEnum;
    this.cause = cause;
  }

  public mapToResponse(_context: ContextEvent): RobotDestroyedResponseEvent {
    return new RobotDestroyedResponseEvent({
      sourceRobotId: this.sourceRobotId,
      responseValidated: true,
      targetRobotId: this.targetRobotId,
      actionTypeEnum: this.actionType,
      cause: this.cause,
    });
  }
}

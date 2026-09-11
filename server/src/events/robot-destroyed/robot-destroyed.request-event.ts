import { RequestEvent } from '@events/request.event';
import { EventContext } from '@events/context.event';
import { RobotDestroyedResponseEvent } from '@events/robot-destroyed/robot-destroyed.response-event';
import { ActionTypeEnum, EffectTypeEnum } from 'shared';

export class RobotDestroyedRequestEvent implements RequestEvent {
  sourceRobotId: string;
  targetRobotId: string;
  actionType: ActionTypeEnum | undefined;
  effectType: EffectTypeEnum | undefined;
  cause: string;

  constructor(
    sourceRobotId: string,
    targetRobotId: string,
    actionTypeEnum: ActionTypeEnum | undefined,
    effectType: EffectTypeEnum | undefined,
    cause: string
  ) {
    this.sourceRobotId = sourceRobotId;
    this.targetRobotId = targetRobotId;
    this.actionType = actionTypeEnum;
    this.effectType = effectType;
    this.cause = cause;
  }

  public mapToResponse(_context: EventContext): RobotDestroyedResponseEvent {
    return new RobotDestroyedResponseEvent({
      sourceRobotId: this.sourceRobotId,
      responseValidated: true,
      targetRobotId: this.targetRobotId,
      actionTypeEnum: this.actionType,
      effectType: this.effectType,
      cause: this.cause,
    });
  }
}

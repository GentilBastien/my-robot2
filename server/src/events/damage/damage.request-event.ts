import { RequestEvent } from '@events/request.event';
import { ContextEvent } from '@events/context.event';
import { DamageResponseEvent } from '@events/damage/damage.response-event';
import { ActionElementTypeEnum, ActionTypeEnum } from 'shared';
import { DamageResult, MitigationCalculator } from '@calculators/mitigation.calculator';

export class DamageRequestEvent implements RequestEvent {
  sourceRobotId: string;
  actionTypeEnum: ActionTypeEnum;
  actionElementTypeEnum: ActionElementTypeEnum;
  targetRobotId: string;
  baseDamage: number;

  constructor(
    sourceRobotId: string,
    actionTypeEnum: ActionTypeEnum,
    actionElementTypeEnum: ActionElementTypeEnum,
    targetRobotId: string,
    baseDamage: number
  ) {
    this.sourceRobotId = sourceRobotId;
    this.actionTypeEnum = actionTypeEnum;
    this.actionElementTypeEnum = actionElementTypeEnum;
    this.targetRobotId = targetRobotId;
    this.baseDamage = baseDamage;
  }

  public mapToResponse(context: ContextEvent): DamageResponseEvent {
    const damageResult: DamageResult = MitigationCalculator.damageMitigationCalculator({
      context,
      sourceRobotId: this.sourceRobotId,
      targetRobotId: this.targetRobotId,
      actionTypeEnum: this.actionTypeEnum,
      actionElementTypeEnum: this.actionElementTypeEnum,
      baseDamage: this.baseDamage,
    });

    return new DamageResponseEvent({
      responseValidated: true,
      actionElementTypeEnum: this.actionElementTypeEnum,
      sourceRobotId: this.sourceRobotId,
      targetRobotId: this.targetRobotId,
      actionTypeEnum: this.actionTypeEnum,
      ...damageResult,
    });
  }
}

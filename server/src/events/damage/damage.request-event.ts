import { RequestEvent } from '@events/request.event';
import { EventContext } from '@events/context.event';
import { DamageResponseEvent } from '@events/damage/damage.response-event';
import { ActionTypeEnum, EffectTypeEnum, ElementTypeEnum } from 'shared';
import { DamageResult, MitigationCalculator } from '@calculators/mitigation.calculator';

export class DamageRequestEvent implements RequestEvent {
  sourceRobotId: string;
  actionTypeEnum: ActionTypeEnum | undefined;
  effectTypeEnum: EffectTypeEnum | undefined;
  elementTypeEnum: ElementTypeEnum;
  targetRobotId: string;
  baseDamage: number;

  constructor(
    sourceRobotId: string,
    actionTypeEnum: ActionTypeEnum | undefined,
    effectTypeEnum: EffectTypeEnum | undefined,
    elementTypeEnum: ElementTypeEnum,
    targetRobotId: string,
    baseDamage: number
  ) {
    this.sourceRobotId = sourceRobotId;
    this.actionTypeEnum = actionTypeEnum;
    this.effectTypeEnum = effectTypeEnum;
    this.elementTypeEnum = elementTypeEnum;
    this.targetRobotId = targetRobotId;
    this.baseDamage = baseDamage;
  }

  public mapToResponse(context: EventContext): DamageResponseEvent {
    const damageResult: DamageResult = MitigationCalculator.damageMitigationCalculator({
      context,
      sourceRobotId: this.sourceRobotId,
      targetRobotId: this.targetRobotId,
      actionTypeEnum: this.actionTypeEnum,
      effectTypeEnum: this.effectTypeEnum,
      elementTypeEnum: this.elementTypeEnum,
      baseDamage: this.baseDamage,
    });

    return new DamageResponseEvent({
      responseValidated: true,
      elementTypeEnum: this.elementTypeEnum,
      sourceRobotId: this.sourceRobotId,
      targetRobotId: this.targetRobotId,
      actionTypeEnum: this.actionTypeEnum,
      effectTypeEnum: this.effectTypeEnum,
      ...damageResult,
    });
  }
}

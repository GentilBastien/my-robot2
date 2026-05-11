import { AbstractActionRequestEvent } from '@events/action/action-event-list-impl/abstract-action.request-event';
import { ContextEvent } from '@events/context.event';
import { AutoAttackActionResponseEvent } from '@events/action/action-event-list-impl/auto-attack/auto-attack-action.response-event';
import { ActionTypeEnum, DamageTypeEnum } from 'shared';
import { DamageAction, TargetedAction, UpgradedAction } from '@events/action/action.event-list';

export class AutoAttackActionRequestEvent
  extends AbstractActionRequestEvent
  implements DamageAction, TargetedAction, UpgradedAction
{
  sourceRobotId: string;
  actionTypeEnum: ActionTypeEnum.AUTO_ATTACK;
  damage: number;
  damageType: DamageTypeEnum.ENERGETIC;
  hasEnergyModule: boolean;
  targetRobotId: string;

  constructor(
    sourceRobotId: string,
    actionTypeEnum: ActionTypeEnum.AUTO_ATTACK,
    damage: number,
    damageType: DamageTypeEnum.ENERGETIC,
    hasEnergyModule: boolean,
    targetRobotId: string
  ) {
    super(sourceRobotId, actionTypeEnum);
    this.sourceRobotId = sourceRobotId;
    this.actionTypeEnum = actionTypeEnum;
    this.damage = damage;
    this.damageType = damageType;
    this.hasEnergyModule = hasEnergyModule;
    this.targetRobotId = targetRobotId;
  }

  public mapToResponse(_context: ContextEvent): AutoAttackActionResponseEvent {
    return new AutoAttackActionResponseEvent({
      sourceRobotId: '',
      actionTypeEnum: this.actionTypeEnum,
      responseValidated: true,
    });
  }
}

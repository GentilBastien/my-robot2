import { AbstractActionRequestEvent } from '@events/action/action-event-list-impl/abstract-action.request-event';
import { ContextEvent } from '@events/context.event';
import { AutoAttackActionResponseEvent } from '@events/action/action-event-list-impl/auto-attack/auto-attack-action.response-event';
import { ActionTypeEnum } from 'shared';
import { DamageAction, TargetedAction, UpgradedAction } from '@events/action/action.event-list';

export class AutoAttackActionRequestEvent
  extends AbstractActionRequestEvent
  implements DamageAction, TargetedAction, UpgradedAction
{
  sourceRobotId: string;
  actionTypeEnum: ActionTypeEnum.AUTO_ATTACK;

  damage: number;
  targetRobotId: string;
  hasEnergyModule: boolean;

  constructor(sourceRobotId: string, targetRobotId: string, damage: number, hasEnergyModule: boolean) {
    super(sourceRobotId, ActionTypeEnum.AUTO_ATTACK);
    this.sourceRobotId = sourceRobotId;
    this.actionTypeEnum = ActionTypeEnum.AUTO_ATTACK;
    this.damage = damage;
    this.hasEnergyModule = hasEnergyModule;
    this.targetRobotId = targetRobotId;
  }

  public mapToResponse(context: ContextEvent): AutoAttackActionResponseEvent {
    return new AutoAttackActionResponseEvent({
      sourceRobotId: this.sourceRobotId,
      targetRobotId: this.targetRobotId,
      responseValidated: super.isActionAllowed(context),
      damage: this.damage,
      hasEnergyModule: this.hasEnergyModule,
    });
  }
}

import { AbstractActionRequestEvent } from '@events/action/action-event-list-impl/abstract-action.request-event';
import { ContextEvent } from '@events/context.event';
import { AutoAttackActionResponseEvent } from '@events/action/action-event-list-impl/auto-attack/auto-attack-action.response-event';
import { ActionTypeEnum, DamageAction, TargetedAction } from 'shared';
import { ActionResponseErrors } from '@entities/actions/action-responses/action-response-errors';

export class AutoAttackActionRequestEvent extends AbstractActionRequestEvent implements DamageAction, TargetedAction {
  sourceRobotId: string;
  actionTypeEnum: ActionTypeEnum.AUTO_ATTACK;
  hasEnergyModule: boolean;

  damage: number;
  targetRobotId: string;

  constructor(sourceRobotId: string, targetRobotId: string, damage: number, hasEnergyModule: boolean) {
    super(sourceRobotId, ActionTypeEnum.AUTO_ATTACK, hasEnergyModule);
    this.sourceRobotId = sourceRobotId;
    this.actionTypeEnum = ActionTypeEnum.AUTO_ATTACK;
    this.hasEnergyModule = hasEnergyModule;
    this.damage = damage;
    this.targetRobotId = targetRobotId;
  }

  public mapToResponse(context: ContextEvent): AutoAttackActionResponseEvent {
    const actionResponseErrors: ActionResponseErrors = super.isActionAllowed(context);
    return new AutoAttackActionResponseEvent({
      sourceRobotId: this.sourceRobotId,
      targetRobotId: this.targetRobotId,
      responseValidated: Object.keys(actionResponseErrors).length === 0,
      actionResponseErrors,
      damage: this.damage,
      hasEnergyModule: this.hasEnergyModule,
    });
  }
}

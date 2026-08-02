import { ActionTypeEnum, DamageAction, TargetedAction } from 'shared';
import { AbstractActionRequestEvent } from '@events/action/NEW/abstract-action.request-event';

export class AutoAttackActionRequestEvent extends AbstractActionRequestEvent implements DamageAction, TargetedAction {
  sourceRobotId: string;
  actionTypeEnum: ActionTypeEnum.AUTO_ATTACK;
  hasEnergyModule: boolean;

  damage: number;
  targetRobotId: string;

  constructor(sourceRobotId: string, targetRobotId: string, damage: number, hasEnergyModule: boolean) {
    super(ActionTypeEnum.AUTO_ATTACK, sourceRobotId, hasEnergyModule);
    this.sourceRobotId = sourceRobotId;
    this.actionTypeEnum = ActionTypeEnum.AUTO_ATTACK;
    this.hasEnergyModule = hasEnergyModule;
    this.damage = damage;
    this.targetRobotId = targetRobotId;
  }

  protected onUse(): void {}
}

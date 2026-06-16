import { AbstractActionResponseEvent } from '@events/action/action-event-list-impl/abstract-action.response-event';
import { ActionTypeEnum } from 'shared';
import { DamageAction, TargetedAction, UpgradedAction } from '@events/action/action.event-list';

export class AutoAttackActionResponseEvent
  extends AbstractActionResponseEvent
  implements DamageAction, TargetedAction, UpgradedAction
{
  actionTypeEnum: ActionTypeEnum.AUTO_ATTACK;
  sourceRobotId: string;
  targetRobotId: string;
  damage: number;
  hasEnergyModule: boolean;
  responseValidated: boolean;

  public constructor(parameters: {
    sourceRobotId: string;
    targetRobotId: string;
    responseValidated: boolean;
    damage: number;
    hasEnergyModule: boolean;
  }) {
    super(ActionTypeEnum.AUTO_ATTACK, parameters.sourceRobotId, parameters.responseValidated);
    this.actionTypeEnum = ActionTypeEnum.AUTO_ATTACK;
    this.sourceRobotId = parameters.sourceRobotId;
    this.targetRobotId = parameters.targetRobotId;
    this.damage = parameters.damage;
    this.hasEnergyModule = parameters.hasEnergyModule;
    this.responseValidated = parameters.responseValidated;
  }
}

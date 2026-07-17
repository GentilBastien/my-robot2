import { AbstractActionResponseEvent } from '@events/action/action-event-list-impl/abstract-action.response-event';
import { ActionTypeEnum } from 'shared';
import { DamageAction, TargetedAction } from '@events/action/action.event-list';
import { ActionResponseErrors } from '@entities/actions/action-responses/action-response-errors';

export class AutoAttackActionResponseEvent extends AbstractActionResponseEvent implements DamageAction, TargetedAction {
  actionTypeEnum: ActionTypeEnum.AUTO_ATTACK;
  sourceRobotId: string;
  targetRobotId: string;
  damage: number;
  hasEnergyModule: boolean;
  responseValidated: boolean;
  actionResponseErrors: ActionResponseErrors;

  public constructor(parameters: {
    sourceRobotId: string;
    targetRobotId: string;
    responseValidated: boolean;
    actionResponseErrors: ActionResponseErrors;
    damage: number;
    hasEnergyModule: boolean;
  }) {
    super(
      ActionTypeEnum.AUTO_ATTACK,
      parameters.sourceRobotId,
      parameters.responseValidated,
      parameters.actionResponseErrors
    );
    this.actionTypeEnum = ActionTypeEnum.AUTO_ATTACK;
    this.sourceRobotId = parameters.sourceRobotId;
    this.targetRobotId = parameters.targetRobotId;
    this.damage = parameters.damage;
    this.hasEnergyModule = parameters.hasEnergyModule;
    this.responseValidated = parameters.responseValidated;
    this.actionResponseErrors = parameters.actionResponseErrors;
  }
}

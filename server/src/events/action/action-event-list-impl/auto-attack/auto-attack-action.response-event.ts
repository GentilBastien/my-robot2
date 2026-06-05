import { AbstractActionResponseEvent } from '@events/action/action-event-list-impl/abstract-action.response-event';
import { ContextEvent } from '@events/context.event';
import { ActionTypeEnum, DamageTypeEnum, MaybeArray, Reducer } from 'shared';
import { RequestEvent } from '@events/request.event';
import { DamageAction, TargetedAction, UpgradedAction } from '@events/action/action.event-list';

export class AutoAttackActionResponseEvent
  extends AbstractActionResponseEvent
  implements DamageAction, TargetedAction, UpgradedAction
{
  sourceRobotId: string;
  actionTypeEnum: ActionTypeEnum.AUTO_ATTACK;
  damageType: DamageTypeEnum.ENERGETIC;
  damage: number;
  targetRobotId: string;
  hasEnergyModule: boolean;
  responseValidated: boolean;

  public mapToReducer(context: ContextEvent): MaybeArray<Reducer> {
    if (this.responseValidated) {
      const requestEventsFromAction: RequestEvent[] = this.getRequestEventsOnUse(context);
      context.pendingRequests.insertEnd(requestEventsFromAction);
    }
    return [];
  }

  public constructor(parameters: {
    sourceRobotId: string;
    targetRobotId: string;
    responseValidated: boolean;
    damage: number;
    hasEnergyModule: boolean;
  }) {
    super(parameters.sourceRobotId, ActionTypeEnum.AUTO_ATTACK, parameters.responseValidated);
    this.targetRobotId = parameters.targetRobotId;
    this.actionTypeEnum = ActionTypeEnum.AUTO_ATTACK;
    this.damageType = DamageTypeEnum.ENERGETIC;
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.damage = parameters.damage;
    this.hasEnergyModule = parameters.hasEnergyModule;
  }
}

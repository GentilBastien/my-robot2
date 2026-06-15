import { AbstractActionResponseEvent } from '@events/action/action-event-list-impl/abstract-action.response-event';
import { ContextEvent } from '@events/context.event';
import { ActionTypeEnum, MaybeArray, Reducer } from 'shared';
import { RequestEvent } from '@events/request.event';
import { DamageAction, TargetedAction, UpgradedAction } from '@events/action/action.event-list';
import { energyModulesReducer, remainingActionsReducer, remainingSubActionsReducer } from '@reducers/resources.reducer';

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

  public mapToReducer(context: ContextEvent): MaybeArray<Reducer> {
    if (this.responseValidated) {
      const requestEventsFromAction: RequestEvent[] = this.getRequestEventsOnUse(context);
      context.pendingRequests.insertEnd(requestEventsFromAction);
    }
    //TODO, impl the good reducers. This is an example.
    return [
      remainingActionsReducer(this.sourceRobotId, 1),
      remainingSubActionsReducer(this.sourceRobotId, 2),
      energyModulesReducer(this.sourceRobotId, 4),
    ];
  }

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

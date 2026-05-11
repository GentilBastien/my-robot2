import { AbstractActionResponseEvent } from '@events/action/action-event-list-impl/abstract-action.response-event';
import { ContextEvent } from '@events/context.event';
import { ActionTypeEnum, Reducer } from 'shared';

export class AutoAttackActionResponseEvent extends AbstractActionResponseEvent {
  sourceRobotId: string;
  actionTypeEnum: ActionTypeEnum.AUTO_ATTACK;
  responseValidated: boolean;

  public mapToReducer(_context: ContextEvent): Reducer | null {
    throw new Error('Method not implemented.');
  }

  public constructor(parameters: {
    sourceRobotId: string;
    actionTypeEnum: ActionTypeEnum.AUTO_ATTACK;
    responseValidated: boolean;
  }) {
    super(parameters.sourceRobotId, parameters.actionTypeEnum, parameters.responseValidated);
    this.sourceRobotId = parameters.sourceRobotId;
    this.actionTypeEnum = parameters.actionTypeEnum;
    this.responseValidated = parameters.responseValidated;
  }
}

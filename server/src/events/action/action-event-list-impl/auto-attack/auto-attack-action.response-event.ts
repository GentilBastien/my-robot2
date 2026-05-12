import { AbstractActionResponseEvent } from '@events/action/action-event-list-impl/abstract-action.response-event';
import { ContextEvent } from '@events/context.event';
import { ActionTypeEnum, Reducer } from 'shared';
import { RequestEvent } from '@events/request.event';

export class AutoAttackActionResponseEvent extends AbstractActionResponseEvent {
  sourceRobotId: string;
  actionTypeEnum: ActionTypeEnum.AUTO_ATTACK;
  responseValidated: boolean;

  public mapToReducer(context: ContextEvent): Reducer | null {
    if (this.responseValidated) {
      const requestEventsFromAction: RequestEvent[] = this.getResponseEvents(context);
      context.pendingRequests.push(...requestEventsFromAction);
    }

    return null;
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

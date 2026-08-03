import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { MaybeArray, Reducer } from 'shared';
import { ActionResponseErrors } from '@entities/actions/action-responses/action-response-errors';
import { Action } from '@entities/actions/action';
import { ActionContext } from '@entities/actions/action.context';
import { RequestEvent } from '@events/request.event';

export class ActionResponseEvent implements ResponseEvent {
  action: Action;
  sourceRobotId: string;
  responseValidated: boolean;
  actionResponseErrors: ActionResponseErrors;

  constructor(
    action: Action,
    sourceRobotId: string,
    responseValidated: boolean,
    actionResponseErrors: ActionResponseErrors
  ) {
    this.action = action;
    this.sourceRobotId = sourceRobotId;
    this.responseValidated = responseValidated;
    this.actionResponseErrors = actionResponseErrors;
  }

  public mapToReducer(context: ContextEvent): MaybeArray<Reducer> {
    const actionContext: ActionContext = {
      actionResponseEvent: this,
      ...context,
    };
    const resourcesRequests: RequestEvent[] = this.action.requestResourcesForAction(actionContext);
    const onUseRequests: RequestEvent[] = this.action.onUse(actionContext);

    context.pendingRequests.insertEnd(resourcesRequests);
    context.pendingRequests.insertEnd(onUseRequests);

    return [];
  }
}

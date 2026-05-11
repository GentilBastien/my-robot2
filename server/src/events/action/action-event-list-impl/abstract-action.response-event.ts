import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { ActionTypeEnum, Reducer } from 'shared';

export abstract class AbstractActionResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  actionTypeEnum: ActionTypeEnum;
  responseValidated: boolean;

  protected constructor(sourceRobotId: string, actionTypeEnum: ActionTypeEnum, responseValidated: boolean) {
    this.sourceRobotId = sourceRobotId;
    this.actionTypeEnum = actionTypeEnum;
    this.responseValidated = responseValidated;
  }

  public abstract mapToReducer(_context: ContextEvent): Reducer | null;
}

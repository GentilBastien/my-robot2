import { ContextEvent } from '@events/context.event';
import { ActionTypeEnum, Reducer } from 'shared';
import { RequestEvent } from '@events/request.event';
import { Action } from '@entities/actions/action';
import { ActionResponseEvent } from '@events/action/action.event-list';

export abstract class AbstractActionResponseEvent implements ActionResponseEvent {
  sourceRobotId: string;
  actionTypeEnum: ActionTypeEnum;
  responseValidated: boolean;

  protected constructor(sourceRobotId: string, actionTypeEnum: ActionTypeEnum, responseValidated: boolean) {
    this.sourceRobotId = sourceRobotId;
    this.actionTypeEnum = actionTypeEnum;
    this.responseValidated = responseValidated;
  }

  public getRequestEventsOnUse(context: ContextEvent): RequestEvent[] {
    const action: Action = context.gameCalculator.getAction(this.actionTypeEnum);
    return action.onUse({
      actionResponseEvent: this,
      gameState: context.gameState,
      gameCalculator: context.gameCalculator,
    });
  }

  public abstract mapToReducer(_context: ContextEvent): Reducer | null;
}

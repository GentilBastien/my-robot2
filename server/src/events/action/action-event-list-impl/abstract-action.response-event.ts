import { ContextEvent } from '@events/context.event';
import { ActionTypeEnum, MaybeArray, Reducer } from 'shared';
import { RequestEvent } from '@events/request.event';
import { Action } from '@entities/actions/action';
import { ActionResponseEvent } from '@events/action/action.event-list';

export abstract class AbstractActionResponseEvent implements ActionResponseEvent {
  sourceRobotId: string;
  actionTypeEnum: ActionTypeEnum;
  responseValidated: boolean;

  protected constructor(actionTypeEnum: ActionTypeEnum, sourceRobotId: string, responseValidated: boolean) {
    this.actionTypeEnum = actionTypeEnum;
    this.sourceRobotId = sourceRobotId;
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

  public abstract mapToReducer(_context: ContextEvent): MaybeArray<Reducer>;
}

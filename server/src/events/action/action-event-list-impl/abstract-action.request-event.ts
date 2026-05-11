import { ContextEvent } from '@events/context.event';
import { ActionResponseEvent } from '@events/action/action.response-event';
import { Action } from '@entities/actions/action';
import { ActionTypeEnum } from 'shared';
import { ActionResponseErrors } from '@entities/actions/action-responses/action-response-errors';
import { ActionRequestEvent } from '@events/action/action.event-list';
import { ResponseEvent } from '@events/response.event';

export abstract class AbstractActionRequestEvent implements ActionRequestEvent {
  sourceRobotId: string;
  actionTypeEnum: ActionTypeEnum;

  protected constructor(sourceRobotId: string, actionTypeEnum: ActionTypeEnum) {
    this.sourceRobotId = sourceRobotId;
    this.actionTypeEnum = actionTypeEnum;
  }

  public isActionAllowed(context: ContextEvent): boolean {
    const action: Action = context.gameCalculator.getAction(this.actionTypeEnum);
    const actionResponseErrors: ActionResponseErrors = context.gameCalculator.robotAllowedForAction(
      context.gameState,
      this.sourceRobotId,
      action
    );
    return Object.keys(actionResponseErrors).length === 0;
  }

  public getResponseEvents(context: ContextEvent): ResponseEvent[] {
    const action: Action = context.gameCalculator.getAction(this.actionTypeEnum);
    return action.onUse({
      actionRequestEvent: this,
      gameState: context.gameState,
      gameCalculator: context.gameCalculator,
    });
  }

  public abstract mapToResponse(context: ContextEvent): ActionResponseEvent;
}

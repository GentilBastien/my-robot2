import { ContextEvent } from '@events/context.event';
import { AbstractActionResponseEvent } from '@events/action/action-event-list-impl/abstract-action.response-event';
import { Action } from '@entities/actions/action';
import { ActionTypeEnum } from 'shared';
import { ActionResponseErrors } from '@entities/actions/action-responses/action-response-errors';
import { ActionRequestEvent } from '@events/action/action.event-list';

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

  public abstract mapToResponse(context: ContextEvent): AbstractActionResponseEvent;
}

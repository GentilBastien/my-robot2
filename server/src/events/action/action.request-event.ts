import { ActionData } from 'shared';
import { EventContext } from '@events/context.event';
import { ActionResponseErrors } from '@entities/actions/action-responses/action-response-errors';
import { RobotCalculator } from '@calculators/robot.calculator';
import { RequestEvent } from '@events/request.event';
import { ActionResponseEvent } from '@events/action/action.response-event';
import { Action } from '@entities/actions/action';

export class ActionRequestEvent implements RequestEvent {
  sourceRobotId: string;
  actionData: ActionData;
  action: Action;

  constructor(data: ActionData) {
    this.sourceRobotId = data.sourceRobotId;
    this.actionData = data;
    this.action = RobotCalculator.getAction(data.actionTypeEnum);
  }

  public mapToResponse(context: EventContext): ActionResponseEvent {
    const actionResponseErrors: ActionResponseErrors = RobotCalculator.robotAllowedForAction(
      context,
      this.actionData,
      this.action
    );
    const actionValidated: boolean = Object.keys(actionResponseErrors).length === 0;
    return new ActionResponseEvent(this.actionData, this.action, actionValidated, actionResponseErrors);
  }
}

import { ActionData, ActionTypeEnum, Coordinate } from 'shared';
import { ContextEvent } from '@events/context.event';
import { Action } from '@entities/actions/action';
import { ActionResponseErrors } from '@entities/actions/action-responses/action-response-errors';
import { RobotCalculator } from '@calculators/robot.calculator';
import { RequestEvent } from '@events/request.event';
import { ActionResponseEvent } from '@events/action/action.response-event';

export class ActionRequestEvent implements RequestEvent, ActionData {
  action: Action;
  actionTypeEnum: ActionTypeEnum;
  sourceRobotId: string;
  hasEnergyModule: boolean;
  targetRobotId?: string;
  targetCellCoordinate?: Coordinate;

  constructor(data: ActionData) {
    this.actionTypeEnum = data.actionTypeEnum;
    this.action = RobotCalculator.getAction(this.actionTypeEnum);
    this.sourceRobotId = data.sourceRobotId;
    this.hasEnergyModule = data.hasEnergyModule;
    this.targetRobotId = data.targetRobotId;
    this.targetCellCoordinate = data.targetCellCoordinate;
  }

  public mapToResponse(context: ContextEvent): ActionResponseEvent {
    const actionResponseErrors: ActionResponseErrors = RobotCalculator.robotAllowedForAction(context, this);
    const actionValidated: boolean = Object.keys(actionResponseErrors).length === 0;
    return new ActionResponseEvent(this.action, this.sourceRobotId, actionValidated, actionResponseErrors);
  }
}

import { ContextEvent } from '@events/context.event';
import { ActionTypeEnum, MaybeArray, Reducer } from 'shared';
import { RequestEvent } from '@events/request.event';
import { Action } from '@entities/actions/action';
import { ActionResponseErrors } from '@entities/actions/action-responses/action-response-errors';
import { RobotCalculator } from '@calculators/robot.calculator';

export abstract class AbstractActionResponseEvent {
  sourceRobotId: string;
  actionTypeEnum: ActionTypeEnum;
  responseValidated: boolean;
  actionResponseErrors: ActionResponseErrors;

  protected constructor(
    actionTypeEnum: ActionTypeEnum,
    sourceRobotId: string,
    responseValidated: boolean,
    actionResponseErrors: ActionResponseErrors
  ) {
    this.actionTypeEnum = actionTypeEnum;
    this.sourceRobotId = sourceRobotId;
    this.responseValidated = responseValidated;
    this.actionResponseErrors = actionResponseErrors;
  }

  public mapToReducer(context: ContextEvent): MaybeArray<Reducer> {

  }
}

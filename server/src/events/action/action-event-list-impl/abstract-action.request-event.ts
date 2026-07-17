import { ContextEvent } from '@events/context.event';
import { AbstractActionResponseEvent } from '@events/action/action-event-list-impl/abstract-action.response-event';
import { Action } from '@entities/actions/action';
import { ActionTypeEnum } from 'shared';
import { ActionResponseErrors } from '@entities/actions/action-responses/action-response-errors';
import { ActionRequestEvent } from '@events/action/action.event-list';

export abstract class AbstractActionRequestEvent implements ActionRequestEvent {
  sourceRobotId: string;
  actionTypeEnum: ActionTypeEnum;
  hasEnergyModule: boolean;

  protected constructor(sourceRobotId: string, actionTypeEnum: ActionTypeEnum, hasEnergyModule: boolean) {
    this.sourceRobotId = sourceRobotId;
    this.actionTypeEnum = actionTypeEnum;
    this.hasEnergyModule = hasEnergyModule;
  }

  public isActionAllowed(context: ContextEvent): ActionResponseErrors {
    const action: Action = context.gameCalculator.getAction(this.actionTypeEnum);
    return context.gameCalculator.robotAllowedForAction(context.gameState, this.sourceRobotId, action);
  }

  public abstract mapToResponse(context: ContextEvent): AbstractActionResponseEvent;
}

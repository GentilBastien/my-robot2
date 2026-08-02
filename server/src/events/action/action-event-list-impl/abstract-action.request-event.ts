import { ContextEvent } from '@events/context.event';
import { AbstractActionResponseEvent } from '@events/action/action-event-list-impl/abstract-action.response-event';
import { Action } from '@entities/actions/action';
import { ActionRequestEvent, ActionTypeEnum, GameEventTypeEnum } from 'shared';
import { ActionResponseErrors } from '@entities/actions/action-responses/action-response-errors';
import { RobotCalculator } from '@calculators/robot.calculator';

export abstract class AbstractActionRequestEvent implements ActionRequestEvent {
  gameEventType: GameEventTypeEnum.ACTION;
  sourceRobotId: string;
  actionTypeEnum: ActionTypeEnum;
  hasEnergyModule: boolean;

  protected constructor(sourceRobotId: string, actionTypeEnum: ActionTypeEnum, hasEnergyModule: boolean) {
    this.gameEventType = GameEventTypeEnum.ACTION;
    this.sourceRobotId = sourceRobotId;
    this.actionTypeEnum = actionTypeEnum;
    this.hasEnergyModule = hasEnergyModule;
  }

  public isActionAllowed(context: ContextEvent): ActionResponseErrors {
    const action: Action = RobotCalculator.getAction(this.actionTypeEnum);
    return RobotCalculator.robotAllowedForAction(context, this.sourceRobotId, action);
  }

  public abstract mapToResponse(context: ContextEvent): AbstractActionResponseEvent;
}

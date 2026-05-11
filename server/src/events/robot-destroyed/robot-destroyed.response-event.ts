import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { ActionTypeEnum, Reducer, RobotStateTypeEnum } from 'shared';
import { updateSelfStates } from '@reducers/robot.reducer';

export class RobotDestroyedResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  targetRobotId: string;
  actionType: ActionTypeEnum;
  cause: string;

  public mapToReducer(context: ContextEvent): Reducer | null {
    const robotDestroyedSelfStates = context.gameState.robots[this.targetRobotId].selfStates;
    const addedDeathState = robotDestroyedSelfStates.concat(RobotStateTypeEnum.DEATH);
    return updateSelfStates(this.targetRobotId, addedDeathState);
  }

  public constructor(parameters: {
    sourceRobotId: string;
    responseValidated: boolean;
    targetRobotId: string;
    actionTypeEnum: ActionTypeEnum;
    cause: string;
  }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.targetRobotId = parameters.targetRobotId;
    this.actionType = parameters.actionTypeEnum;
    this.cause = parameters.cause;
  }
}

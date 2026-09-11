import { EventContext } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { ActionTypeEnum, EffectTypeEnum, MaybeArray, Reducer, RobotStateTypeEnum } from 'shared';
import { updateSelfStates } from '@reducers/robot.reducer';

export class RobotDestroyedResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  targetRobotId: string;
  actionType: ActionTypeEnum | undefined;
  effectType: EffectTypeEnum | undefined;
  cause: string;

  public constructor(parameters: {
    sourceRobotId: string;
    responseValidated: boolean;
    targetRobotId: string;
    actionTypeEnum: ActionTypeEnum | undefined;
    effectType: EffectTypeEnum | undefined;
    cause: string;
  }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.targetRobotId = parameters.targetRobotId;
    this.actionType = parameters.actionTypeEnum;
    this.effectType = parameters.effectType;
    this.cause = parameters.cause;
  }

  public mapToReducer(context: EventContext): MaybeArray<Reducer> {
    const robotDestroyedSelfStates = context.gameState.robots[this.targetRobotId].selfStates;
    const addedDeathState = robotDestroyedSelfStates.concat(RobotStateTypeEnum.DEAD);
    return updateSelfStates(this.targetRobotId, addedDeathState);
  }
}

import { RobotDestroyedResponseStateEvent } from '@events/response-state.event';
import { GameState, Reducer, RobotStateTypeEnum } from 'shared';
import { updateSelfStates } from '@reducers/robot.reducer';

export function robotDestroyedResponseStateCase(
  readonlyGameState: Readonly<GameState>,
  robotDestroyedResponseStateEvent: RobotDestroyedResponseStateEvent
): Reducer {
  const robotDestroyedId = robotDestroyedResponseStateEvent.targetRobotId;
  const robotDestroyedSelfStates = readonlyGameState.robots[robotDestroyedId].selfStates;
  const addedDeathState = robotDestroyedSelfStates.concat(RobotStateTypeEnum.DEATH);
  return updateSelfStates(robotDestroyedId, addedDeathState);
}

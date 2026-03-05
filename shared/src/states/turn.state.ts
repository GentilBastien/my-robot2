import { RobotState } from './robot.state';
import { TurnStateTypeEnum } from '../enums/turn-state-type.enum';

export interface TurnState {
  currentTurnNumber: number;
  currentTurnRobot: RobotState;
  turnStateTypeEnum: TurnStateTypeEnum;
}

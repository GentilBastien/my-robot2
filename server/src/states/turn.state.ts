import { RobotState } from '@states/robot.state';

export interface TurnState {
  currentTurnNumber: number;
  currentTurnRobot: RobotState;
}

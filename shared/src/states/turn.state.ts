import { RobotState } from './robot.state';

export interface TurnState {
  currentTurnNumber: number;
  currentTurnRobot: RobotState;
}

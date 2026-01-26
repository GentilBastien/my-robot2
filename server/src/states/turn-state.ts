import { Robot } from '@entities/robot/robot';

export interface TurnState {
  currentTurnNumber: number;
  currentTurnRobot: Robot;
}

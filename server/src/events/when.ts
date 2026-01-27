import { ActionInstance } from '@entities/actions/action-instance';
import { RobotState } from '@states/robot.state';

export interface TemporalTurn {
  onTurnStart(robot: RobotState): void;
  onTurnEnd(robot: RobotState): void;
  onEveryTurnStart(): void;
  onEveryTurnEnd(): void;
  onAction(actionInstance: ActionInstance): void;
  onMovementUsedUp(): void;
}

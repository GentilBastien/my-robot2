import { ActionInstance } from '@entities/actions/action-instance';
import { Robot } from '@entities/robot/robot';

export interface TemporalTurn {
  onTurnStart(robot: Robot): void;
  onTurnEnd(robot: Robot): void;
  onEveryTurnStart(): void;
  onEveryTurnEnd(): void;
  onAction(actionInstance: ActionInstance): void;
  onMovementUsedUp(): void;
}

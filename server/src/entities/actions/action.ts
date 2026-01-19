import { ActionInstance } from './action-instance';
import { GameEvent } from '../../events/game-event';

export interface Action {
  manaCost: number;
  overheatingCost: number;
  range: number;
  baseAmount: number;
  onApply(actionInstance: ActionInstance): GameEvent[];
  onTurnEnd(actionInstance: ActionInstance): GameEvent[];
}

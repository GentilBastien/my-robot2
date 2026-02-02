import { ActionInstance } from './action-instance';
import { RequestEvent } from '@events/request.event';
import { RequestActionEvent } from '@events/request-action.event';

export interface Action {
  manaCost: number;
  overheatingCost: number;
  range: number;
  baseAmount: number;
  onApply(actionInstance: ActionInstance): RequestActionEvent;
  onTurnEndAfterApply(actionInstance: ActionInstance): RequestEvent[];
}

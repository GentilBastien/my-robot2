import { ActionInstance } from './action-instance';
import { RequestStateEvent } from '@events/request-state.event';
import { ActionRequestStateEvent } from '@events/action-request-state.event';

export interface Action {
  manaCost: number;
  overheatingCost: number;
  range: number;
  baseAmount: number;
  onApply(actionInstance: ActionInstance): ActionRequestStateEvent;
  onTurnEndAfterApply(actionInstance: ActionInstance): RequestStateEvent[];
}

import { ActionInstance } from './action-instance';
import { ActionRequestStateEvent } from '@events/action-request-state.event';

export interface Action {
  manaCost: number;
  overheatingCost: number;
  range: number;
  baseAmount: number;
  onUse(actionInstance: ActionInstance): ActionRequestStateEvent;
}

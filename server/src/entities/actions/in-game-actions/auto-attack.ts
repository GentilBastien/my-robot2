import { Action } from '../action';
import { ActionInstance } from '../action-instance';
import { ActionRequestStateEvent } from '@events/action-request-state.event';
import { RequestStateEvent } from '@events/request-state.event';

export class AutoAttack implements Action {
  public range: number = 2;
  public baseAmount: number = 10;
  public manaCost: number = 0;
  public overheatingCost: number = 0;

  public onApply(actionInstance: ActionInstance): ActionRequestStateEvent {
    return {} as ActionRequestStateEvent;
  }

  public onTurnEndAfterApply(_: ActionInstance): RequestStateEvent[] {
    return [];
  }
}

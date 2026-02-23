import { Action } from '../action';
import { ActionInstance } from '../action-instance';
import { ActionRequestStateEvent } from '@events/action-request-state.event';

export class AutoAttack implements Action {
  public range = 2;
  public baseAmount = 10;
  public manaCost = 0;
  public overheatingCost = 0;

  public onUse(actionInstance: ActionInstance): ActionRequestStateEvent {
    return {} as ActionRequestStateEvent;
  }
}

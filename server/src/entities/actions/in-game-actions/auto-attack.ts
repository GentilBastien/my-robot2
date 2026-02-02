import { Action } from '../action';
import { ActionInstance } from '../action-instance';
import { RequestActionEvent } from '@events/request-action.event';
import { RequestEvent } from '@events/request.event';

export class AutoAttack implements Action {
  public range: number = 2;
  public baseAmount: number = 10;
  public manaCost: number = 0;
  public overheatingCost: number = 0;

  public onApply(actionInstance: ActionInstance): RequestActionEvent {
    return {} as RequestActionEvent;
  }

  public onTurnEndAfterApply(_: ActionInstance): RequestEvent[] {
    return [];
  }
}

import { Action } from '../action';
import { ResponseStateEvent } from '@events/response-state.event';
import { RequestAutoAttackActionEvent } from '@events/request-action-state.event';

export class AutoAttack implements Action {
  public range = 2;
  public baseAmount = 10;
  public manaCost = 0;
  public overheatingCost = 0;

  public onUse(_: RequestAutoAttackActionEvent): ResponseStateEvent[] {
    return [];
  }
}

import { Action } from '../action';
import { ResponseStateEvent } from '@events/response-state.event';
import { ActionContext } from '@entities/actions/action-context';

export class AutoAttack implements Action {
  public range = 2;
  public baseAmount = 10;
  public manaCost = 0;
  public overheatingCost = 0;
  public actionCost = 1;

  public onUse(_: ActionContext): ResponseStateEvent[] {
    return [];
  }
}

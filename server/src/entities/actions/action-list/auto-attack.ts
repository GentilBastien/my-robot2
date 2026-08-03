import { ActionElementTypeEnum } from 'shared';
import { Action } from '@entities/actions/action';
import { RequestEvent } from '@events/request.event';
import { ActionContext } from '../action.context';

export class AutoAttack extends Action {
  public actionElementTypeEnum = ActionElementTypeEnum.ENERGETIC;
  public baseAmount = 10;

  public needVision = true;
  public needTarget = true;
  public range = 2;

  public actionCost = 1;

  public onUse(context: ActionContext): RequestEvent[] {
    throw new Error('Method not implemented.');
  }
}

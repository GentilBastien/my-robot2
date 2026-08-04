import { ActionElementTypeEnum } from 'shared';
import { Action } from '@entities/actions/action';
import { RequestEvent } from '@events/request.event';
import { ActionContext } from '../action.context';

export class AutoAttack extends Action {
  public override actionElementTypeEnum = ActionElementTypeEnum.ENERGETIC;
  public override baseAmount = 10;

  public override needVision = true;
  public override needTarget = true;
  public override range = 2;

  public override actionCost = 1;

  public onUse(_context: ActionContext): RequestEvent[] {
    throw new Error('Method not implemented.');
  }
}

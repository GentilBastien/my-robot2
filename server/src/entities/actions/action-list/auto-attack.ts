import { ActionElementTypeEnum } from 'shared';
import { Action } from '@entities/actions/action';

export class AutoAttack extends Action {
  public actionElementTypeEnum = ActionElementTypeEnum.ENERGETIC;
  public baseAmount = 10;

  public needVision = true;
  public needTarget = true;
  public range = 2;

  public actionCost = 1;
}

import { ActionResultTypeEnum } from 'shared';
import { Action } from '@entities/actions/action';

export class AutoAttack extends Action {
  public actionResultTypeEnum = ActionResultTypeEnum.ENERGETIC;
  public baseAmount = 10;

  public needVision = true;
  public needTarget = true;
  public range = 2;

  public actionCost = 1;
}

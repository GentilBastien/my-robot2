import { Action } from '../action';
import { ActionContext } from '@entities/actions/action-context';
import { ResponseEvent } from '@events/response.event';

export class AutoAttack implements Action {
  public range = 2;
  public needVision = true;
  public baseAmount = 10;
  public manaCost = 0;
  public overheatingCost = 0;
  public actionCost = 1;

  public onUse(_: ActionContext): ResponseEvent[] {
    //Request Mana
    //Request EnergyModules
    //Request Effects
    //Request Damage
    return [];
  }
}

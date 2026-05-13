import { Action } from '../action';
import { ActionContext } from '@entities/actions/action-context';
import { RequestEvent } from '@events/request.event';
import { AutoAttackActionResponseEvent } from '@events/action/action-event-list-impl/auto-attack/auto-attack-action.response-event';

export class AutoAttack implements Action {
  public range = 2;
  public needVision = true;
  public baseAmount = 10;
  public manaCost = 0;
  public overheatingCost = 0;
  public actionCost = 1;

  public onUse(_context: ActionContext<AutoAttackActionResponseEvent>): RequestEvent[] {
    //Request Mana
    //Request EnergyModules
    //Request Effects
    //Request Damage
    return [];
  }
}

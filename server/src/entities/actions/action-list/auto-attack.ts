import { Action } from '../action';
import { ActionContext } from '@entities/actions/action-context';
import { AutoAttackActionRequestEvent } from '@events/action/action-event-list-impl/auto-attack/auto-attack-action.request-event';
import { RequestEvent } from '@events/request.event';

export class AutoAttack implements Action {
  public range = 2;
  public needVision = true;
  public baseAmount = 10;
  public manaCost = 0;
  public overheatingCost = 0;
  public actionCost = 1;

  public onUse(_context: ActionContext<AutoAttackActionRequestEvent>): RequestEvent[] {
    //Request Mana
    //Request EnergyModules
    //Request Effects
    //Request Damage
    return [];
  }
}

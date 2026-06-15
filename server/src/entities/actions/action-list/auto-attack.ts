import { Action } from '../action';
import { ActionContext } from '@entities/actions/action-context';
import { RequestEvent } from '@events/request.event';
import { AutoAttackActionResponseEvent } from '@events/action/action-event-list-impl/auto-attack/auto-attack-action.response-event';
import { DamageTypeEnum } from 'shared';

export class AutoAttack implements Action {
  public damageType = DamageTypeEnum.ENERGETIC;
  public baseAmount = 10;

  public needVision = true;
  public needTarget = true;
  public range = 2;

  public actionCost = 1;

  public onUse(_context: ActionContext<AutoAttackActionResponseEvent>): RequestEvent[] {
    //Request Mana
    //Request EnergyModules
    //Request Effects
    //Request Damage
    return [];
  }
}

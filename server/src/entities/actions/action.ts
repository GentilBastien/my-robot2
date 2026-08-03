import { ActionElementTypeEnum } from 'shared';
import { HpRequestEvent } from '@events/hp/hp.request-event';
import { RequestEvent } from '@events/request.event';
import { ActionContext } from '@entities/actions/action.context';
import { ShieldRequestEvent } from '@events/shield/shield.request-event';
import { ManaRequestEvent } from '@events/mana/mana.request-event';
import { MovementCostRequestEvent } from '@events/movement-cost/movement-cost.request-event';
import { HeatRequestEvent } from '@events/heat/heat.request-event';
import { ActionCostRequestEvent } from '@events/action-cost/action-cost.request-event';

export abstract class Action {
  actionElementTypeEnum: ActionElementTypeEnum = ActionElementTypeEnum.ENERGETIC;
  baseAmount = 0;
  range = 1;
  needVision = true;
  needTarget = true;

  hpCost?: number;
  shieldCost?: number;
  manaCost?: number;
  movementCost?: number;
  overheatingCost?: number;

  actionCost?: number;
  subActionCost?: number;

  energyModuleCost?: number;

  public abstract onUse(context: ActionContext): RequestEvent[];

  public requestResourcesForAction(context: ActionContext): RequestEvent[] {
    const requestEvents: RequestEvent[] = [];
    const sourceRobotId: string = context.actionResponseEvent.sourceRobotId;
    if (this.hpCost) {
      requestEvents.push(new HpRequestEvent(sourceRobotId, -this.hpCost));
    }
    if (this.shieldCost) {
      requestEvents.push(new ShieldRequestEvent(sourceRobotId, -this.shieldCost));
    }
    if (this.manaCost) {
      requestEvents.push(new ManaRequestEvent(sourceRobotId, -this.manaCost));
    }
    if (this.movementCost) {
      requestEvents.push(new MovementCostRequestEvent(sourceRobotId, this.movementCost));
    }
    if (this.overheatingCost) {
      requestEvents.push(new HeatRequestEvent(sourceRobotId, this.overheatingCost));
    }
    if (this.actionCost || this.subActionCost) {
      requestEvents.push(new ActionCostRequestEvent(sourceRobotId, this.actionCost ?? 0, this.subActionCost ?? 0));
    }
    return requestEvents;
  }
}

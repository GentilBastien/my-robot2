import { ActionContext } from '@entities/actions/action-context';
import { RequestEvent } from '@events/request.event';
import { AbstractActionResponseEvent } from '@events/action/action-event-list-impl/abstract-action.response-event';
import { ActionElementTypeEnum } from 'shared';
import { HpRequestEvent } from '@events/hp/hp.request-event';
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

  public onUse(actionContext: ActionContext<AbstractActionResponseEvent>): RequestEvent[] {
    const sourceRobotId: string = actionContext.actionResponseEvent.sourceRobotId;
    const requestEvents: RequestEvent[] = [];
    if (this.hpCost) {
      const hpRequestEvent = new HpRequestEvent(sourceRobotId, -this.hpCost);
      requestEvents.push(hpRequestEvent);
    }
    if (this.shieldCost) {
      const shieldRequestEvent = new ShieldRequestEvent(sourceRobotId, -this.shieldCost);
      requestEvents.push(shieldRequestEvent);
    }
    if (this.manaCost) {
      const manaRequestEvent = new ManaRequestEvent(sourceRobotId, -this.manaCost);
      requestEvents.push(manaRequestEvent);
    }
    if (this.movementCost) {
      const movementCostRequestEvent = new MovementCostRequestEvent(sourceRobotId, this.movementCost);
      requestEvents.push(movementCostRequestEvent);
    }
    if (this.overheatingCost) {
      const heatRequestEvent = new HeatRequestEvent(sourceRobotId, this.overheatingCost);
      requestEvents.push(heatRequestEvent);
    }
    if (this.actionCost || this.subActionCost) {
      const actionCost = this.actionCost ?? 0;
      const subActionCost = this.subActionCost ?? 0;
      const actionRequestEvent = new ActionCostRequestEvent(sourceRobotId, actionCost, subActionCost);
      requestEvents.push(actionRequestEvent);
    }
    return requestEvents;
  }
}

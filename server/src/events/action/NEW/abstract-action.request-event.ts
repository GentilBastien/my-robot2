import { ActionRequestEvent, ActionTypeEnum, GameEventTypeEnum } from 'shared';
import { ContextEvent } from '@events/context.event';
import { Action } from '@entities/actions/action';
import { ActionResponseErrors } from '@entities/actions/action-responses/action-response-errors';
import { RobotCalculator } from '@calculators/robot.calculator';
import { HpRequestEvent } from '@events/hp/hp.request-event';
import { ShieldRequestEvent } from '@events/shield/shield.request-event';
import { ManaRequestEvent } from '@events/mana/mana.request-event';
import { MovementCostRequestEvent } from '@events/movement-cost/movement-cost.request-event';
import { HeatRequestEvent } from '@events/heat/heat.request-event';
import { ActionCostRequestEvent } from '@events/action-cost/action-cost.request-event';

export abstract class AbstractActionRequestEvent implements ActionRequestEvent {
  gameEventType: GameEventTypeEnum.ACTION;
  actionTypeEnum: ActionTypeEnum;
  action: Action;
  sourceRobotId: string;
  hasEnergyModule: boolean;

  protected constructor(actionTypeEnum: ActionTypeEnum, sourceRobotId: string, hasEnergyModule: boolean) {
    this.gameEventType = GameEventTypeEnum.ACTION;
    this.actionTypeEnum = actionTypeEnum;
    this.action = RobotCalculator.getAction(this.actionTypeEnum);
    this.sourceRobotId = sourceRobotId;
    this.hasEnergyModule = hasEnergyModule;
  }

  protected abstract onUse(): void;

  public getActionResponseErrors(context: ContextEvent): ActionResponseErrors {
    return RobotCalculator.robotAllowedForAction(context, this.sourceRobotId, this.action);
  }

  private hpCost(): HpRequestEvent | undefined {
    const hpCost = this.action.hpCost;
    if (hpCost) {
      return new HpRequestEvent(this.sourceRobotId, -hpCost);
    }
    return undefined;
  }

  private shieldCost(): ShieldRequestEvent | undefined {
    const shieldCost = this.action.shieldCost;
    if (shieldCost) {
      return new ShieldRequestEvent(this.sourceRobotId, -shieldCost);
    }
    return undefined;
  }

  private manaCost(): ManaRequestEvent | undefined {
    const manaCost = this.action.manaCost;
    if (manaCost) {
      return new ManaRequestEvent(this.sourceRobotId, -manaCost);
    }
    return undefined;
  }

  private movementCost(): MovementCostRequestEvent | undefined {
    const movementCost = this.action.movementCost;
    if (movementCost) {
      return new MovementCostRequestEvent(this.sourceRobotId, movementCost);
    }
    return undefined;
  }

  private overheatingCost(): HeatRequestEvent | undefined {
    const overheatingCost = this.action.overheatingCost;
    if (overheatingCost) {
      return new HeatRequestEvent(this.sourceRobotId, overheatingCost);
    }
    return undefined;
  }

  private actionCost(): ActionCostRequestEvent | undefined {
    const actionCost = this.action.actionCost;
    const subActionCost = this.action.subActionCost;
    if (actionCost !== undefined || subActionCost !== undefined) {
      return new ActionCostRequestEvent(this.sourceRobotId, actionCost, subActionCost);
    }
    return undefined;
  }
}

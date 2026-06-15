import { ActionContext } from '@entities/actions/action-context';
import { RequestEvent } from '@events/request.event';
import { AbstractActionResponseEvent } from '@events/action/action-event-list-impl/abstract-action.response-event';
import { DamageTypeEnum } from 'shared';

export interface Action {
  damageType: DamageTypeEnum;
  baseAmount: number;

  range: number;
  needVision: boolean;
  needTarget: boolean;

  hpCost?: number;
  shieldCost?: number;
  manaCost?: number;
  movementCost?: number;
  overheatingCost?: number;
  actionCost?: number;
  subActionCost?: number;

  onUse(actionContext: ActionContext<AbstractActionResponseEvent>): RequestEvent[];
}

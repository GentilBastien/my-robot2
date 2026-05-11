import { ActionContext } from '@entities/actions/action-context';
import { ResponseEvent } from '@events/response.event';
import { AbstractActionRequestEvent } from '@events/action/action-event-list-impl/abstract-action.request-event';

export interface Action {
  manaCost?: number;
  overheatingCost?: number;
  range: number;
  needVision: boolean;
  baseAmount: number;
  actionCost?: number;
  subActionCost?: number;
  onUse(actionContext: ActionContext<AbstractActionRequestEvent>): ResponseEvent[];
}

import { ActionContext } from '@entities/actions/action-context';
import { RequestEvent } from '@events/request.event';
import { AbstractActionResponseEvent } from '@events/action/action-event-list-impl/abstract-action.response-event';

export interface Action {
  manaCost?: number;
  overheatingCost?: number;
  range: number;
  needVision: boolean;
  baseAmount: number;
  actionCost?: number;
  subActionCost?: number;
  onUse(actionContext: ActionContext<AbstractActionResponseEvent>): RequestEvent[];
}

import { ResponseStateEvent } from '@events/response-state.event';
import { ActionContext } from '@entities/actions/action-context';

export interface Action {
  manaCost?: number;
  overheatingCost?: number;
  range: number;
  needVision: boolean;
  baseAmount: number;
  actionCost?: number;
  subActionCost?: number;
  onUse(actionContext: ActionContext): ResponseStateEvent[];
}

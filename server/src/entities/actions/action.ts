import { ResponseStateEvent } from '@events/response-state.event';
import { RequestActionStateEvent } from '@events/request-action-state.event';

export interface Action {
  manaCost: number;
  overheatingCost: number;
  range: number;
  baseAmount: number;
  actionCost?: number;
  subActionCost?: number;
  onUse(requestActionStateEvent: RequestActionStateEvent): ResponseStateEvent[];
}

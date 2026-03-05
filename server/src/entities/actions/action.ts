import { ResponseStateEvent } from '@events/response-state.event';

export interface Action {
  manaCost: number;
  overheatingCost: number;
  range: number;
  baseAmount: number;
  onUse(): ResponseStateEvent[];
}

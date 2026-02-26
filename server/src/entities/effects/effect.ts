import { EffectCategoryTypeEnum } from 'shared';
import { RequestStateEvent } from '@events/request-state.event';
import { EffectContext } from '@entities/effects/effect-context';

export interface Effect {
  id: string;
  type: EffectCategoryTypeEnum;
  ticking: EffectTickingConfig;
  stacking: EffectStackingConfig;
  handle(context: EffectContext): RequestStateEvent[];
}

export interface EffectTickingConfig {
  everyTurn: boolean;
  atApply: boolean;
  totalTurns: number;
}

export interface EffectStackingConfig {
  enabled: boolean;
  maxStacks: number;
  refreshDuration: boolean;
}

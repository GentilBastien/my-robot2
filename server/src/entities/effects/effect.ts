import { EffectCategoryTypeEnum } from 'shared';
import { RequestStateEvent } from '@events/request-state.event';
import { EffectContext } from '@entities/effects/effect-context';

export interface Effect {
  readonly id: string;
  readonly type: EffectCategoryTypeEnum;
  readonly ticking: EffectTickingConfig;
  readonly stacking: EffectStackingConfig;
  handle(context: EffectContext): RequestStateEvent[];
}

export interface EffectTickingConfig {
  readonly everyTurn: boolean;
  readonly atApply: boolean;
  readonly totalTurns: number;
}

export interface EffectStackingConfig {
  readonly enabled: boolean;
  readonly maxStacks: number;
  readonly refreshDuration: boolean;
}

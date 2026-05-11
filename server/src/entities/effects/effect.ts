import { EffectCategoryTypeEnum } from 'shared';
import { EffectContext } from '@entities/effects/effect-context';
import { RequestEvent } from '@events/request.event';

export interface Effect {
  readonly type: EffectCategoryTypeEnum;
  readonly ticking: EffectTickingConfig;
  readonly stacking: EffectStackingConfig;
  handle(context: EffectContext): RequestEvent[];
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

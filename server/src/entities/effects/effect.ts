import { EffectCategoryTypeEnum } from 'shared';
import { EffectInstance } from './effect-instance';
import { RequestStateEvent } from '../../events/request-state-event';

export interface Effect {
  type: EffectCategoryTypeEnum;
  ticking: EffectTickingConfig;
  stacking: EffectStackingConfig;
  onApply(effectInstance: EffectInstance): RequestStateEvent[];
  onTurnStart(effectInstance: EffectInstance): RequestStateEvent[];
  onTurnEnd(effectInstance: EffectInstance): RequestStateEvent[];
  onExpire(effectInstance: EffectInstance): RequestStateEvent[];
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

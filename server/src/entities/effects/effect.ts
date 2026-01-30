import { EffectCategoryTypeEnum } from 'shared';
import { EffectInstance } from './effect-instance';
import { RequestEvent } from '@events/request.event';

export interface Effect {
  type: EffectCategoryTypeEnum;
  ticking: EffectTickingConfig;
  stacking: EffectStackingConfig;
  onApply(effectInstance: EffectInstance): RequestEvent[];
  onAction(effectInstance: EffectInstance): RequestEvent[];
  onTurnStart(effectInstance: EffectInstance): RequestEvent[];
  onTurnEnd(effectInstance: EffectInstance): RequestEvent[];
  onEveryTurnStart(effectInstance: EffectInstance): RequestEvent[];
  onEveryTurnEnd(effectInstance: EffectInstance): RequestEvent[];
  onExpire(effectInstance: EffectInstance): RequestEvent[];
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

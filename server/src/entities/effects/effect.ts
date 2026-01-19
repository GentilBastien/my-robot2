import { EffectCategoryTypeEnum } from 'shared';
import { EffectInstance } from './effect-instance';
import { GameEvent } from '../../events/game-event';

export interface Effect {
  type: EffectCategoryTypeEnum;
  ticking: EffectTickingConfig;
  stacking: EffectStackingConfig;
  onApply?(effectInstance: EffectInstance): GameEvent[];
  onTurnStart?(effectInstance: EffectInstance): GameEvent[];
  onTurnEnd?(effectInstance: EffectInstance): GameEvent[];
  onExpire?(effectInstance: EffectInstance): GameEvent[];
}

export interface EffectTickingConfig {
  everyTurn: boolean;
  atApply: boolean;
}

export interface EffectStackingConfig {
  enabled: boolean;
  maxStacks: number;
  refreshDuration: boolean;
}

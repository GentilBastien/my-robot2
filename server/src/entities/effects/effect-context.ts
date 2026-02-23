import { EffectInstance } from '@entities/effects/effect-instance';
import { GameState } from 'shared';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { Action } from '@entities/actions/action';

export interface EffectContext {
  trigger: EffectTrigger;
  effectInstance: EffectInstance;
  readonlyGameState: Readonly<GameState>;
  gameCalculator: GameCalculator;
  action?: Action;
}

import { EffectState, GameState } from 'shared';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { Action } from '@entities/actions/action';

export interface EffectContext {
  trigger: EffectTrigger;
  effectState: EffectState;
  readonlyGameState: Readonly<GameState>;
  gameCalculator: GameCalculator;
  action?: Action;
}

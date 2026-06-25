import { Coordinates, EffectState, GameState } from 'shared';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { Action } from '@entities/actions/action';
import { GameCalculator } from '@calculators/game.calculator';

export interface EffectContext {
  trigger: EffectTrigger;
  effectState: EffectState;
  gameState: Readonly<GameState>;
  gameCalculator: GameCalculator;
  action?: Action;
  coordinates?: Coordinates;
}

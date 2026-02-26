import { EffectState } from '../../../../shared/src/states/effect.state';
import { GameState } from 'shared';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { Action } from '@entities/actions/action';

export interface EffectContext {
  trigger: EffectTrigger;
  effectInstance: EffectState;
  readonlyGameState: Readonly<GameState>;
  gameCalculator: GameCalculator;
  action?: Action;
}

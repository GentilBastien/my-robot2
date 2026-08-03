import { Coordinate, EffectState, GameState } from 'shared';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { Action } from '@entities/actions/action';
import { GameStateHandler } from '@game/game.state-handler';

export interface EffectContext {
  readonly trigger: EffectTrigger;
  readonly effectState: EffectState;
  readonly gameState: Readonly<GameState>;
  readonly gameStateHandler: GameStateHandler;
  readonly action?: Action;
  readonly coordinates?: Coordinate;
}

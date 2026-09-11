import { Coordinate, EffectState, GameState } from 'shared';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { Action } from '@entities/actions/action';
import { GameStateHandler } from '@game/game.state-handler';
import { ArrayIndexStructure } from '@structures/array-index/array-index.structure';
import { RequestEvent } from '@events/request.event';
import { EventContext } from '@events/context.event';

export interface EffectContext extends EventContext {
  readonly trigger: EffectTrigger;
  readonly effectState: EffectState;
  readonly gameState: Readonly<GameState>;
  readonly gameStateHandler: GameStateHandler;
  readonly pendingRequests: ArrayIndexStructure<RequestEvent>;
  readonly action?: Action;
  readonly coordinates?: Coordinate;
}

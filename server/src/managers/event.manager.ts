import { Game } from '../states/game';
import { resolveGameEvent } from '../resolvers/game-events.resolver';
import { resolveRequestStateEvent } from '../resolvers/request-state-events.resolver';
import { resolveResponseStateEvent } from '../resolvers/response-state-events.resolver';
import { GameEvent } from '../events/game-event';
import { RequestStateEvent } from '../events/request-state-event';
import { ResponseStateEvent } from '../events/response-state-event';

export class EventManager {
  public manageGameEvent(game: Game, gameEvent: GameEvent): void {
    resolveGameEvent(game, gameEvent).flatMap((requestEvent: RequestStateEvent) =>
      resolveRequestStateEvent(game, requestEvent).flatMap((responseEvent: ResponseStateEvent) =>
        resolveResponseStateEvent(game, responseEvent)
      )
    );
  }
}

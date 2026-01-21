import { resolveGameEvent } from '../resolvers/game-events.resolver';
import { Game } from '../states/game';
import { resolveRequestStateEvent } from '../resolvers/request-state-events.resolver';
import { map } from 'rxjs';
import { resolveResponseStateEvent } from '../resolvers/response-state-events.resolver';

export class EventManager {
  public manageGameEvent(game: Game) {
    return game.actionEvents$.pipe(
      map(gameEvent =>
        resolveGameEvent(game, gameEvent).flatMap(requestEvent =>
          resolveRequestStateEvent(game, requestEvent).flatMap(responseEvent =>
            resolveResponseStateEvent(game, responseEvent)
          )
        )
      )
    );
  }
}

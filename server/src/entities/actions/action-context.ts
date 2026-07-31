import { GameState } from 'shared';
import { AbstractActionResponseEvent } from '@events/action/action-event-list-impl/abstract-action.response-event';
import { GameStateHandler } from '@game/game.state-handler';

export interface ActionContext<T extends AbstractActionResponseEvent> {
  readonly actionResponseEvent: T;
  readonly gameState: Readonly<GameState>;
  readonly gameStateHandler: GameStateHandler;
}

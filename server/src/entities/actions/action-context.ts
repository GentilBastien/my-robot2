import { GameCalculator } from '@game/game-calculator/game.calculator';
import { GameState } from 'shared';
import { AbstractActionRequestEvent } from '@events/action/action-event-list-impl/abstract-action.request-event';

export interface ActionContext<T extends AbstractActionRequestEvent> {
  actionRequestEvent: T;
  gameState: Readonly<GameState>;
  gameCalculator: GameCalculator;
}

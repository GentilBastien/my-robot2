import { GameCalculator } from '@game/game-calculator/game.calculator';
import { GameState } from 'shared';
import { AbstractActionResponseEvent } from '@events/action/action-event-list-impl/abstract-action.response-event';

export interface ActionContext<T extends AbstractActionResponseEvent> {
  actionResponseEvent: T;
  gameState: Readonly<GameState>;
  gameCalculator: GameCalculator;
}

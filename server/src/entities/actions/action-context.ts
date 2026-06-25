import { GameState } from 'shared';
import { AbstractActionResponseEvent } from '@events/action/action-event-list-impl/abstract-action.response-event';
import { GameCalculator } from '@calculators/game.calculator';

export interface ActionContext<T extends AbstractActionResponseEvent> {
  actionResponseEvent: T;
  gameState: Readonly<GameState>;
  gameCalculator: GameCalculator;
}

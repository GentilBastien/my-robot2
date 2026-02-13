import { GameState } from '@states/game.state';
import { GameEventTypeEnum } from 'shared';
import { RequestStateEvent } from '@events/request-state.event';

export class EffectEventHandler {
  public handleGameEvent(state: GameState, gameEventTypeEnum: GameEventTypeEnum): RequestStateEvent[] {
    switch (gameEventTypeEnum) {
      case GameEventTypeEnum.TURN_START: {
        return this.onTurnStart(state);
      }
      case GameEventTypeEnum.TURN_END: {
        return this.onTurnEnd(state, event as TurnGameEvent);
      }
      case GameEventTypeEnum.ADVANCE_TURN: {
        return this.onNextTurn(state, event as AdvanceTurnGameEvent);
      }
      default:
        return [];
    }
  }
}

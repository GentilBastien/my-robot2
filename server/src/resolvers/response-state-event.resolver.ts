import {
  AdvanceTurnResponseStateEvent,
  ResponseStateEvent,
  StartTurnResponseStateEvent,
} from '@events/response-state.event';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { RequestStateEvent } from '@events/request-state.event';
import { GameCalculator } from '../game/game-calculator/game.calculator';
import { GameEventTypeEnum, GameState, Reducer, ResponseTypeEnum, TurnStateTypeEnum } from 'shared';
import { startTurnReducer, turnAdvanceReducer } from '../reducers/turn.reducer';

export class ResponseStateEventResolver {
  public static resolve(
    gameCalculator: GameCalculator,
    readonlyGameState: Readonly<GameState>,
    responseEvent: ResponseStateEvent,
    pendingGameEvents: PriorityListStructure<RequestStateEvent>
  ): Reducer {
    if (responseEvent.responseType === ResponseTypeEnum.VALID) {
      switch (responseEvent.gameEventType) {
        case GameEventTypeEnum.TURN_START: {
          const startTurnResponseStateEvent = responseEvent as StartTurnResponseStateEvent;
          const robotPlayingId = startTurnResponseStateEvent.turnRobotId;
          const activeEffectInstances = gameCalculator.getActiveEffectInstances(readonlyGameState);
          const newPendingGameEventsFromEffects = activeEffectInstances.flatMap(activeEffectInstance => {
            let newPendingGameEvents: RequestStateEvent[] = [];
            if (robotPlayingId === activeEffectInstance.sourceId) {
              const onTurnStartGameEvents = activeEffectInstance.effect.onTurnStart(activeEffectInstance);
              newPendingGameEvents = newPendingGameEvents.concat(onTurnStartGameEvents);
            }
            const onEveryTurnStartGameEvents = activeEffectInstance.effect.onEveryTurnStart(activeEffectInstance);
            newPendingGameEvents = newPendingGameEvents.concat(onEveryTurnStartGameEvents);
            return newPendingGameEvents;
          });
          pendingGameEvents.addAll(newPendingGameEventsFromEffects);
          return startTurnReducer(TurnStateTypeEnum.STARTED);
        }
        case GameEventTypeEnum.ADVANCE_TURN: {
          const responseAdvanceTurnEvent = responseEvent as AdvanceTurnResponseStateEvent;
          gameCalculator.advanceTurn();
          return turnAdvanceReducer(responseAdvanceTurnEvent.turnNumber, responseAdvanceTurnEvent.turnRobotId);
        }
        default:
          throw new Error('ResponseEventResolver, unknown gameEventType');
      }
    } else {
      // response is invalid
    }
  }
}

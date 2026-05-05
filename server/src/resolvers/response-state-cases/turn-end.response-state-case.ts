import { TurnEndResponseStateEvent } from '@events/response-state.event';
import { RequestResourcesStateEvent, RequestStateEvent, RequestTurnStartStateEvent } from '@events/request-state.event';
import { startTurnReducer } from '@reducers/turn.reducer';
import { EffectState, GameEventTypeEnum, GameState, Reducer, TurnStateTypeEnum } from 'shared';
import { GameCalculator } from '@game/game-calculator/game.calculator';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { Effect } from '@entities/effects/effect';

export function turnEndResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  endTurnResponseStateEvent: TurnEndResponseStateEvent,
  pendingRequestEvents: PriorityListStructure<RequestStateEvent>
): Reducer {
  const robotPlayingId: string = endTurnResponseStateEvent.turnRobotId;
  const effectStatesFromRobot: EffectState[] = gameCalculator.getEffectStatesFromRobot(
    readonlyGameState,
    robotPlayingId
  );
  const effectStatesFromCell: EffectState[] = gameCalculator.getEffectStatesFromRobotCell(
    readonlyGameState,
    robotPlayingId
  );

  const requestStateEventsFromEffects: RequestStateEvent[] = [
    ...effectStatesFromRobot,
    ...effectStatesFromCell,
  ].flatMap(effectState => {
    const effect: Effect = gameCalculator.getEffect(effectState);
    return effect.handle({
      trigger: EffectTrigger.ON_TURN_END,
      effectState,
      readonlyGameState,
      gameCalculator,
    });
  });
  pendingRequestEvents.addAll(requestStateEventsFromEffects);

  const requestEndTurnResourcesStateEvent: RequestResourcesStateEvent = {
    gameEventType: GameEventTypeEnum.RESOURCES,
    sourceRobotId: endTurnResponseStateEvent.turnRobotId,
  };
  pendingRequestEvents.add(requestEndTurnResourcesStateEvent);

  gameCalculator.advanceTurn();
  const requestStartTurnStateEvent: RequestTurnStartStateEvent = {
    gameEventType: GameEventTypeEnum.TURN_START,
    sourceRobotId: endTurnResponseStateEvent.turnRobotId,
  };
  pendingRequestEvents.add(requestStartTurnStateEvent);

  return startTurnReducer(TurnStateTypeEnum.FINISHED);
}

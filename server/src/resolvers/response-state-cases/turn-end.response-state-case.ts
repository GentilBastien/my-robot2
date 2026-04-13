import { TurnEndResponseStateEvent } from '@events/response-state.event';
import {
  RequestAdvanceTurnStateEvent,
  RequestResourcesStateEvent,
  RequestStateEvent,
} from '@events/request-state.event';
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
    const trigger: EffectTrigger =
      effectState.remainingTurns <= 0 ? EffectTrigger.ON_EXPIRE : EffectTrigger.ON_TURN_END;
    return effect.handle({
      trigger,
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

  const requestAdvanceTurnStateEvent: RequestAdvanceTurnStateEvent = {
    gameEventType: GameEventTypeEnum.ADVANCE_TURN,
    sourceRobotId: endTurnResponseStateEvent.turnRobotId,
  };
  pendingRequestEvents.add(requestAdvanceTurnStateEvent);

  return startTurnReducer(TurnStateTypeEnum.FINISHED);
}

import { TurnStartResponseStateEvent } from '@events/response-state.event';
import { RequestStateEvent } from '@events/request-state.event';
import { startTurnReducer } from '@reducers/turn.reducer';
import { EffectState, GameState, Reducer, TurnStateTypeEnum } from 'shared';
import { GameCalculator } from '@game/game-calculator/game.calculator';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { Effect } from '@entities/effects/effect';

export function turnStartResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  turnStartResponseStateEvent: TurnStartResponseStateEvent,
  pendingRequestEvents: PriorityListStructure<RequestStateEvent>
): Reducer {
  const robotPlayingId: string = turnStartResponseStateEvent.turnRobotId;
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
      trigger: EffectTrigger.ON_TURN_START,
      effectState,
      readonlyGameState,
      gameCalculator,
    });
  });

  pendingRequestEvents.addAll(requestStateEventsFromEffects);
  return startTurnReducer(TurnStateTypeEnum.STARTED);
}

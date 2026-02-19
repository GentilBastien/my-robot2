import { StartTurnResponseStateEvent } from '@events/response-state.event';
import { RequestStateEvent } from '@events/request-state.event';
import { startTurnReducer } from '../../reducers/turn.reducer';
import { GameState, Reducer, TurnStateTypeEnum } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';

export function turnStartResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  startTurnResponseStateEvent: StartTurnResponseStateEvent,
  pendingGameEvents: PriorityListStructure<RequestStateEvent>
): Reducer {
  const robotPlayingId = startTurnResponseStateEvent.turnRobotId;
  const activeEffectInstances = gameCalculator.getActiveEffectInstances(readonlyGameState);
  const newPendingRequestStateEvents = activeEffectInstances.flatMap(effectInstance => {
    let newEffects: RequestStateEvent[] = [];
    if (robotPlayingId === effectInstance.sourceId) {
      const onTurnStartGameEvents = effectInstance.effect.onTurnStart(effectInstance);
      newEffects = newEffects.concat(onTurnStartGameEvents);
    }
    const onEveryTurnStartGameEvents = effectInstance.effect.onEveryTurnStart(effectInstance);
    newEffects = newEffects.concat(onEveryTurnStartGameEvents);
    return newEffects;
  });
  pendingGameEvents.addAll(newPendingRequestStateEvents);
  return startTurnReducer(TurnStateTypeEnum.STARTED);
}

import { DamageResponseStateEvent } from '@events/response-state.event';
import { GameEventTypeEnum, GameState, Reducer } from 'shared';
import { GameCalculator } from '@game/game-calculator/game.calculator';
import { hpAndShieldReducer, hpReducer, shieldReducer } from '@reducers/resources.reducer';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { RequestRobotDestroyedStateEvent, RequestStateEvent } from '@events/request-state.event';

export function damageResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  damageResponseStateEvent: DamageResponseStateEvent,
  pendingRequestEvents: PriorityListStructure<RequestStateEvent>
): Reducer {
  const { targetRobotId, damageDealt } = damageResponseStateEvent;
  const { hp, shield } = gameCalculator.getRobotResourcesState(readonlyGameState, targetRobotId);

  const robotDestroyedRequestEvent: RequestRobotDestroyedStateEvent = {
    gameEventType: GameEventTypeEnum.ROBOT_DESTROYED,
    sourceRobotId: damageResponseStateEvent.sourceRobotId,
    targetRobotId: damageResponseStateEvent.targetRobotId,
    cause: `damage (${damageResponseStateEvent.damageDealt})`,
    priority: 100,
    actionTypeEnum: damageResponseStateEvent.actionTypeEnum,
  };

  if (damageDealt <= shield) {
    //shield reducer only
    const newShield = shield - damageDealt;
    return shieldReducer(targetRobotId, newShield);
  } else if (shield === 0) {
    //hp reducer only
    const newHp = Math.max(hp - damageDealt, 0);
    if (newHp === 0) {
      pendingRequestEvents.add(robotDestroyedRequestEvent);
    }
    return hpReducer(targetRobotId, newHp);
  } else {
    //both hp and shield reducers
    const newHp = Math.max(hp + shield - damageDealt, 0);
    if (newHp === 0) {
      pendingRequestEvents.add(robotDestroyedRequestEvent);
    }
    return hpAndShieldReducer(targetRobotId, newHp);
  }
}

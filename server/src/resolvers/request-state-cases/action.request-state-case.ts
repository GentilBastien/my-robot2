import { GameState } from 'shared';
import { ResponseStateEvent } from '@events/response-state.event';
import { isUpgradedAction, RequestActionStateEvent } from '@events/request-action-state.event';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { Action } from '@entities/actions/action';

export function actionRequestStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  requestActionStateEvent: RequestActionStateEvent
): ResponseStateEvent[] {
  const action: Action = gameCalculator.getAction(requestActionStateEvent.actionTypeEnum);

  const robotResourcesState = gameCalculator.getRobotResourcesState(
    readonlyGameState,
    requestActionStateEvent.sourceRobotId
  );
  if (isUpgradedAction(requestActionStateEvent) && robotResourcesState.energyModules > 0) {
    requestActionStateEvent.hasEnergyModule = true;
  }

  const allowed = gameCalculator.robotAllowedForAction(
    readonlyGameState,
    requestActionStateEvent.sourceRobotId,
    action
  );

  return allowed ? action.onUse({ requestActionStateEvent, readonlyGameState, gameCalculator }) : [];
}

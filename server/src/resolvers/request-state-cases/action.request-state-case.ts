import { GameState } from 'shared';
import { ResponseStateEvent } from '@events/response-state.event';
import { isUpgradedAction, RequestActionStateEvent } from '@events/request-action-state.event';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { Action } from '@entities/actions/action';
import { ActionResponseErrors } from '@entities/actions/action-responses/action-response-errors';

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

  const actionResponseErrors: ActionResponseErrors = gameCalculator.robotAllowedForAction(
    readonlyGameState,
    requestActionStateEvent.sourceRobotId,
    action
  );

  const isAllowed = Object.keys(actionResponseErrors).length === 0;

  if (isAllowed) {
    return action.onUse({ requestActionStateEvent, readonlyGameState, gameCalculator });
  } else {
    return [];
  }
}

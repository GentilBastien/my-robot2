import { GameState } from 'shared';
import { ResponseStateEvent } from '@events/response-state.event';
import { RequestActionStateEvent } from '@events/request-action-state.event';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { Action } from '@entities/actions/action';

export function actionRequestStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  actionRequestStateEvent: RequestActionStateEvent
): ResponseStateEvent[] {
  const action: Action = gameCalculator.getAction(actionRequestStateEvent.actionTypeEnum);

  const allowed = gameCalculator.robotAllowedForAction(
    readonlyGameState,
    actionRequestStateEvent.sourceRobotId,
    action
  );

  return allowed ? action.onUse() : [];
}

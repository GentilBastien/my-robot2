import { ActionRequestStateEvent } from '@events/action-request-state.event';
import { ActionEventTypeEnum } from 'shared/dist';
import { GameEvent } from '@events/game.event';

export function actionGameCase(gameEvent: GameEvent): ActionRequestStateEvent {
  const actionEventTypeEnum: ActionEventTypeEnum | undefined = gameEvent.actionEventTypeEnum;
  if (actionEventTypeEnum === undefined) {
    throw 'Temp error, actionEventTypeEnum must be defined if GameEventTypeEnum is ACTION';
  }
  switch (actionEventTypeEnum) {
    case ActionEventTypeEnum.AUTO_ATTACK:
    case ActionEventTypeEnum.THROW_PLASMA_GRENADE:
    case ActionEventTypeEnum.THROW_EMP_GRENADE:
    default:
      throw 'Temp error, invalid actionEventTypeEnum';
  }
}

import { RequestActionStateEvent, RequestAutoAttackActionEvent } from '@events/request-action-state.event';
import { ActionGameEvent, ActionTypeEnum, DamageTypeEnum, GameEventTypeEnum } from 'shared';

export function actionGameCase(actionGameEvent: ActionGameEvent): RequestActionStateEvent {
  const actionTypeEnum: ActionTypeEnum = actionGameEvent.actionTypeEnum;
  switch (actionTypeEnum) {
    case ActionTypeEnum.AUTO_ATTACK: {
      return {
        gameEventType: GameEventTypeEnum.ACTION,
        actionTypeEnum: ActionTypeEnum.AUTO_ATTACK,
        damageType: DamageTypeEnum.ENERGETIC,
        sourceRobotId: actionGameEvent.sourceRobotId,
        targetRobotId: actionGameEvent.data['targetRobotId'],
        damage: Number(actionGameEvent.data['damage']),
      } as RequestAutoAttackActionEvent;
    }
    default:
      throw 'Temp error, invalid actionTypeEnum';
  }
}

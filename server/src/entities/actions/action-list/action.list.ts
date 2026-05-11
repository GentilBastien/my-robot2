import { ActionTypeEnum } from 'shared';
import { Action } from '@entities/actions/action';
import { AutoAttack } from '@entities/actions/action-list/auto-attack';

export const actionList = new Map<ActionTypeEnum, Action>([
  [ActionTypeEnum.AUTO_ATTACK, new AutoAttack()],
  [ActionTypeEnum.THROW_EMP_GRENADE, new AutoAttack()],
  [ActionTypeEnum.THROW_PLASMA_GRENADE, new AutoAttack()],
]);

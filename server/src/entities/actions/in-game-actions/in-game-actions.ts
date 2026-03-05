import { ActionTypeEnum } from 'shared';
import { Action } from '@entities/actions/action';
import { AutoAttack } from '@entities/actions/in-game-actions/auto-attack';

export const allActions = new Map<ActionTypeEnum, Action>([
  [ActionTypeEnum.AUTO_ATTACK, new AutoAttack()],
  [ActionTypeEnum.THROW_EMP_GRENADE, new AutoAttack()],
  [ActionTypeEnum.THROW_PLASMA_GRENADE, new AutoAttack()],
]);

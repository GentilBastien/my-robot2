import { ActionTypeEnum } from 'shared';
import { Action } from '@entities/actions/action';
import { AutoAttack } from '@entities/actions/action-list/auto-attack';

export type Actions = Record<string, Action>;

export const actionList: Readonly<Actions> = {
  [ActionTypeEnum.AUTO_ATTACK]: new AutoAttack(),
};

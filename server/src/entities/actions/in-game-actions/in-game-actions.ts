import { Action } from '@entities/actions/action';
import { AutoAttack } from '@entities/actions/in-game-actions/auto-attack';

export type Actions = Record<string, Action>;

export const allActions: Readonly<Actions> = {
  autoAttack: new AutoAttack(),
};

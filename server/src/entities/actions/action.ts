import { ActionElementTypeEnum } from 'shared';

export abstract class Action {
  actionElementTypeEnum: ActionElementTypeEnum = ActionElementTypeEnum.ENERGETIC;
  baseAmount = 0;
  range = 1;
  needVision = true;
  needTarget = true;

  hpCost?: number;
  shieldCost?: number;
  manaCost?: number;
  movementCost?: number;
  overheatingCost?: number;

  actionCost?: number;
  subActionCost?: number;

  energyModuleCost?: number;
}

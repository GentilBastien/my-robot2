import { Action } from './action';

export class AutoAttack implements Action {
  protected _range: number = 2;
  protected _baseAmount: number = 10;
  baseAmount: number = 0;
  hasPowerSupply: boolean = false;
  manaCost: number = 0;
  overheatingCost: number = 0;
  range: number = 0;

  // public applyAction(): ActionInput[] {
  //   return [
  //     {
  //       amount: this._baseAmount,
  //       damageType: DamageTypeEnum.ENERGETIC,
  //     },
  //   ];
  // }
}

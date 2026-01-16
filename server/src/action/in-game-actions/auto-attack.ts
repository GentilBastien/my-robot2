import { Action } from '../action';
import { Robot } from '../../game-entities/robot';
import { ActionManager } from '../../managers/action.manager';

export class AutoAttack extends Action {
  protected _range: number = 2;
  protected _baseAmount: number = 10;

  public doAction(actionManager: ActionManager, source: Robot, target: Robot): void {
    const { amount, isDodged, isCritical } = Action.doDamage(source, target, this._baseAmount);
    if (amount) {
      target.hp(amount);
    }
  }
}

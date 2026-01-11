import { Action } from '../action';
import { Robot } from '../../game-entities/robot';
import { ActionOutput } from '../action-output';

export class AutoAttack extends Action {
  protected _range: number = 2;
  protected _baseAmount: number = 10;

  constructor(source: Robot, target: Robot) {
    super(source, target);
  }

  public computeAction(): ActionOutput {
    const damageOutput: Partial<ActionOutput> = Action.doDamage(this.source, this.target, this.baseAmount);
    return {
      amount: damageOutput.amount,
      isDodged: damageOutput.isDodged,
      isCritical: damageOutput.isCritical,
    };
  }
}

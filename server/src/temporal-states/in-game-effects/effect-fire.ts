import { Effect } from '../effect';
import { EffectModifier, EffectTypeEnum } from 'shared';
import { AbstractEffectModifier } from '../abstract-effect-modifier';
import { Robot } from '../../game-entities/robot';

export class EffectFire extends Effect {
  constructor() {
    super(EffectTypeEnum.NEGATIVE);
    this.totalTurns = 5;
    this.applyEveryTurn = true;
  }

  public effectModifier(): EffectModifier {
    return new EffectModifierFire(this.source, this.target);
  }
}

class EffectModifierFire extends AbstractEffectModifier {
  constructor(source: Robot, target: Robot) {
    super(source, target);
  }

  public applyEffect(): void {}
  public removeEffect(): void {}
}

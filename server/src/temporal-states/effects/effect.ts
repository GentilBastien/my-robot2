import { EffectModifier, EffectTypeEnum, StateTypeEnum } from 'shared';
import { AbstractTemporalState } from '../abstract-temporal-state';

export abstract class Effect extends AbstractTemporalState {
  protected readonly type: EffectTypeEnum;
  protected readonly modifier: EffectModifier;

  protected applyEveryTurn: boolean;

  protected isStackable: boolean;
  protected stacks: number;
  protected maxStacks: number;

  protected constructor(type: EffectTypeEnum) {
    super();
    this.type = type;
    this.modifier = this.effectModifier();
    this.applyEveryTurn = false;
    this.isStackable = false;
    this.stacks = 0;
    this.maxStacks = 0;
  }

  public abstract effectModifier(): EffectModifier;

  public override update(): void {
    if (this.applyEveryTurn || this.state === StateTypeEnum.PENDING) {
      this.applyEffect();
    }
    super.update();
    if (this.isStateConsumed()) {
      this.removeEffect();
    }
  }

  public applyEffect(): void {
    this.state = StateTypeEnum.STARTED;
    if (this.isStackable && this.stacks < this.maxStacks) {
      this.stacks++;
    }
    this.modifier.applyEffect();
  }

  public removeEffect(): void {
    this.state = StateTypeEnum.FINISHED;
    if (this.isStackable) {
      this.stacks = 0;
    }
    this.modifier.removeEffect();
  }
}

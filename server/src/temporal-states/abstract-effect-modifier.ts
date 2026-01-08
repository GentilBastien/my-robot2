import { EffectModifier } from 'shared';
import { Robot } from '../game-entities/robot';

export abstract class AbstractEffectModifier implements EffectModifier {
  protected source: Robot;
  protected target: Robot;

  protected constructor(source: Robot, target: Robot) {
    this.source = source;
    this.target = target;
  }

  public abstract applyEffect(): void;

  public abstract removeEffect(): void;
}

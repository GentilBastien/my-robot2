import { EffectStateTypeEnum, Updatable } from 'shared';
import { Robot } from '../game-entities/robot';

export abstract class AbstractTemporalState implements Updatable {
  protected state: EffectStateTypeEnum;
  protected totalTurns: number;
  protected _remainingTurns: number;

  protected _source: Robot | undefined;
  protected _target: Robot | undefined;

  protected constructor() {
    this.state = EffectStateTypeEnum.PENDING;
    this.totalTurns = 0;
    this._remainingTurns = 0;
  }

  public update(): void {
    this._remainingTurns--;
  }

  public get remainingTurns(): number {
    return this._remainingTurns;
  }

  public isStateConsumed(): boolean {
    return this._remainingTurns === 0;
  }

  public get source(): Robot {
    if (!this._source) {
      throw new Error('source is required');
    }
    return this._source;
  }

  public get target(): Robot {
    if (!this._target) {
      throw new Error('target is required');
    }
    return this._target;
  }
}

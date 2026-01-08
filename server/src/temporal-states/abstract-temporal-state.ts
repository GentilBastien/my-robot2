import { StateTypeEnum, Updatable } from 'shared';
import { Robot } from '../game-entities/robot';

export abstract class AbstractTemporalState implements Updatable {
  protected state: StateTypeEnum;
  protected totalTurns: number;
  protected remainingTurns: number;

  protected _source: Robot | undefined;
  protected _target: Robot | undefined;

  protected constructor() {
    this.state = StateTypeEnum.PENDING;
    this.totalTurns = 0;
    this.remainingTurns = 0;
  }

  public update(): void {
    this.remainingTurns--;
  }

  public isStateConsumed(): boolean {
    return this.remainingTurns === 0;
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

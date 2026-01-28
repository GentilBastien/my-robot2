import { Updatable } from '../updatable';
import { Action } from '@entities/actions/action';

export class ResourcesRobotManager implements Updatable {
  private _isAlive: boolean = true;

  private _hp: number = 0;
  private _maxHp: number = 0;
  private _regenHp: number = 0;

  private _mana: number = 0;
  private _maxMana: number = 0;
  private _regenMana: number = 0;

  private _overheating: number = 0;
  private _maxOverheating: number = 100;
  private _coolingDown: number = 0;
  private _isOverheating: boolean = false;

  private _energyModules: number = 0;

  public update(): void {
    if (this._isAlive) {
      this.incrementsHpByValue(this._regenHp);
      this.incrementsManaByValue(this._regenMana);
      if (this._isOverheating && this._overheating === 0) {
        this._isOverheating = false;
      }
      if (!this._isOverheating && this._overheating >= this._maxOverheating) {
        this._isOverheating = true;
      }
    }
    const cooling = this._isOverheating ? this._coolingDown / 2 : this._coolingDown;
    this.decrementsOverheatingByValue(cooling);
  }

  public hasEnergyModule(): boolean {
    return this._energyModules > 0;
  }

  public useEnergyModule(): void {
    if (this._energyModules > 0) {
      this._energyModules--;
    }
  }

  public hp(value: number): void {
    this.incrementsHpByValue(value);
    if (this._hp <= 0) {
      this._isAlive = false;
    }
  }

  public mana(value: number): void {
    this.incrementsManaByValue(value);
  }

  public cooling(value: number, enableWhileOverheating: boolean = true): void {
    if (enableWhileOverheating || !this._isOverheating) {
      this.decrementsOverheatingByValue(value);
    }
  }

  public checkResourcesForAction(action: Action): boolean {
    if (this._mana >= action.manaCost && (!this._isOverheating || action.overheatingCost === 0)) {
      this._mana -= action.manaCost;
      this._overheating += action.overheatingCost;
      if (this._overheating >= this._maxOverheating) {
        this._isOverheating = true;
      }
      return true;
    }
    return false;
  }

  private incrementsHpByValue(value: number): void {
    this._hp = this.incrementsValue(0, this._maxHp, this._hp, value);
  }

  private incrementsManaByValue(value: number): void {
    this._mana = this.incrementsValue(0, this._maxMana, this._mana, value);
  }

  private decrementsOverheatingByValue(value: number): void {
    this._overheating = this.incrementsValue(0, this._maxOverheating, this._overheating, value);
  }

  /**
   * Returns the calculation of current + incr, but always enclosed by range [min, max]
   * @param min The min value of the allowed range.
   * @param max The max value of the allowed range.
   * @param current The current value.
   * @param incr The increment, added to the current value.
   */
  private incrementsValue(min: number, max: number, current: number, incr: number): number {
    return Math.max(min, Math.min(current + incr, max));
  }
}

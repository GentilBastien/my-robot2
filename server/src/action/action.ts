import { Robot } from '../game-entities/robot';
import { ActionOutput } from './action-output';
import { AttributesTypeEnum, DiceUtils, GameFunctionsUtils, StatisticsTypeEnum } from 'shared';

export abstract class Action {
  protected _source: Robot | undefined;
  protected _target: Robot | undefined;
  protected _manaCost: number = 0;
  protected _overheatingCost: number = 0;
  protected _range: number = 0;
  protected _hasPowerSupply: boolean = false;
  protected _baseAmount: number = 0;

  protected constructor() {}

  public setOwners(source: Robot, target: Robot): void {
    this._source = source;
    this._target = target;
  }

  public abstract computeAction(): ActionOutput;

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

  public get baseAmount(): number {
    return this._baseAmount;
  }

  public get range(): number {
    return this._range;
  }

  public get manaCost(): number {
    return this._manaCost;
  }

  public get overheatingCost(): number {
    return this._overheatingCost;
  }

  public static doDamage(source: Robot, target: Robot, baseDamage: number): Partial<ActionOutput> {
    let amount: number;
    let isDodged: boolean;
    let isCritical: boolean;

    const hitChanceFromAttributes = source.getAttributeModifier(AttributesTypeEnum.CPU);
    const hitChanceFromStatistics = source.getStatisticModifier(StatisticsTypeEnum.ACCURACY);

    const dodgeChanceFromAttributes = target.getAttributeModifier(AttributesTypeEnum.MOB);
    const dodgeChanceFromStatistics = target.getStatisticModifier(StatisticsTypeEnum.DODGE);

    const atkHitChance = DiceUtils.roll(1, 20) + hitChanceFromAttributes + hitChanceFromStatistics;
    const defDodgeChance = 10 + dodgeChanceFromAttributes + dodgeChanceFromStatistics;
    isDodged = defDodgeChance > atkHitChance;
    if (isDodged) {
      amount = 0;
      isCritical = false;
    } else {
      const damageFromAttributes = source.getAttributeModifier(AttributesTypeEnum.POW);
      const damageFromStatistics = source.getStatisticModifier(StatisticsTypeEnum.DAMAGE);
      amount = baseDamage + damageFromAttributes + damageFromStatistics;
      const critChanceFromStatistics = source.getStatisticModifier(StatisticsTypeEnum.CRITICAL);
      const atkCritChance = DiceUtils.roll(1, 100);
      isCritical = atkCritChance <= critChanceFromStatistics;
      if (isCritical) {
        amount *= 2;
      }
      const defArmor = target.getStatisticModifier(StatisticsTypeEnum.ARMOR);
      amount = GameFunctionsUtils.mitigateDamageWithArmor(amount, defArmor);
      const defRobustFromAttributes = target.getAttributeModifier(AttributesTypeEnum.CHS);
      const defRobustFromStatistics = target.getStatisticModifier(StatisticsTypeEnum.REDUCTION);
      const defRobust = defRobustFromAttributes + defRobustFromStatistics;
      amount = GameFunctionsUtils.mitigateDamageWithRobust(amount, defRobust);
    }
    return { amount, isDodged, isCritical };
  }

  public static doHeal(source: Robot, target: Robot, baseHeal: number): Partial<ActionOutput> {
    let amount: number;
    let isCritical: boolean;
    const healFromAttributePower = source.getAttributeModifier(AttributesTypeEnum.POW);
    const healFromAttributeCpu =
      source.getAttributeModifier(AttributesTypeEnum.CPU) + target.getAttributeModifier(AttributesTypeEnum.CPU);
    amount = baseHeal + healFromAttributePower + healFromAttributeCpu;
    const critChanceFromStatistics = source.getStatisticModifier(StatisticsTypeEnum.CRITICAL);
    const atkCritChance = DiceUtils.roll(1, 100);
    isCritical = atkCritChance <= critChanceFromStatistics;
    return { amount, isCritical };
  }

  public static doShield(source: Robot, target: Robot, baseShield: number): Partial<ActionOutput> {
    let amount: number;
    const shieldFromAttributeCpu =
      source.getAttributeModifier(AttributesTypeEnum.CPU) + target.getAttributeModifier(AttributesTypeEnum.CPU);
    amount = baseShield + shieldFromAttributeCpu;
    return { amount };
  }
}

import { ActionElementTypeEnum, ActionTypeEnum, AttributesTypeEnum, StatisticsTypeEnum } from 'shared';
import { diceRolls } from '@utils/dice.utils';
import { RobotCalculator } from '@calculators/robot.calculator';
import { ContextEvent } from '@events/context.event';

export interface DamageCalculatorParams {
  context: ContextEvent;
  sourceRobotId: string;
  targetRobotId: string;
  actionTypeEnum: ActionTypeEnum;
  actionElementTypeEnum: ActionElementTypeEnum; // reserved for elemental logic
  baseDamage: number;
}

export interface DamageResult {
  damageDealt: number;
  isDodged: boolean;
  isCritical: boolean;
  defArmor: number;
}

export class MitigationCalculator {
  public static resolveHitChance(context: ContextEvent, robotId: string): number {
    const fromAttributes = RobotCalculator.getRobotAttributeModifier(context, robotId, AttributesTypeEnum.CPU);
    const fromStatistics = RobotCalculator.getRobotStatisticValue(context, robotId, StatisticsTypeEnum.ACCURACY);
    return diceRolls(1, 20) + fromAttributes + fromStatistics;
  }

  public static resolveDodgeThreshold(context: ContextEvent, robotId: string): number {
    const fromAttributes = RobotCalculator.getRobotAttributeModifier(context, robotId, AttributesTypeEnum.MOB);
    const fromStatistics = RobotCalculator.getRobotStatisticValue(context, robotId, StatisticsTypeEnum.DODGE);
    return 10 + fromAttributes + fromStatistics;
  }

  public static resolveRawDamage(context: ContextEvent, robotId: string, baseDamage: number): number {
    const fromAttributes = RobotCalculator.getRobotAttributeModifier(context, robotId, AttributesTypeEnum.POW);
    const fromStatistics = RobotCalculator.getRobotStatisticValue(context, robotId, StatisticsTypeEnum.DAMAGE);
    return baseDamage + fromAttributes + fromStatistics;
  }

  public static resolveIsCritical(context: ContextEvent, robotId: string): boolean {
    const critChance = RobotCalculator.getRobotStatisticValue(context, robotId, StatisticsTypeEnum.CRITICAL);
    return diceRolls(1, 100) <= critChance;
  }

  public static applyArmorAndReduction(
    context: ContextEvent,
    targetRobotId: string,
    damage: number
  ): { finalDamage: number; defArmor: number } {
    const defArmor = RobotCalculator.getRobotStatisticValue(context, targetRobotId, StatisticsTypeEnum.ARMOR);
    const afterArmor = damage + (damage * defArmor) / 100;

    const reductionFromAttributes = RobotCalculator.getRobotAttributeModifier(
      context,
      targetRobotId,
      AttributesTypeEnum.CHS
    );
    const reductionFromStatistics = RobotCalculator.getRobotStatisticValue(
      context,
      targetRobotId,
      StatisticsTypeEnum.REDUCTION
    );
    const totalReduction = reductionFromAttributes + reductionFromStatistics;
    const finalDamage = afterArmor + (afterArmor * totalReduction) / 100;

    return { finalDamage, defArmor };
  }

  public static damageMitigationCalculator({
    context,
    sourceRobotId,
    targetRobotId,
    baseDamage,
  }: DamageCalculatorParams): DamageResult {
    const isDodged =
      MitigationCalculator.resolveDodgeThreshold(context, targetRobotId) >
      MitigationCalculator.resolveHitChance(context, sourceRobotId);

    if (isDodged) {
      return { damageDealt: 0, isDodged: true, isCritical: false, defArmor: 0 };
    }

    const isCritical = MitigationCalculator.resolveIsCritical(context, sourceRobotId);
    const rawDamage = MitigationCalculator.resolveRawDamage(context, sourceRobotId, baseDamage);
    const hitDamage = isCritical ? rawDamage * 2 : rawDamage;

    const { finalDamage, defArmor } = MitigationCalculator.applyArmorAndReduction(context, targetRobotId, hitDamage);

    return {
      damageDealt: finalDamage,
      isDodged: false,
      isCritical,
      defArmor,
    };
  }
}

import { ActionElementTypeEnum, ActionTypeEnum, AttributesTypeEnum, GameState, StatisticsTypeEnum } from 'shared';
import { diceRolls } from '@utils/dice.utils';
import { getRobotAttributeModifier, getRobotStatisticValue } from '@calculators/robot.calculator';

export interface DamageCalculatorParams {
  gameState: Readonly<GameState>;
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

export function resolveHitChance(gameState: Readonly<GameState>, robotId: string): number {
  const fromAttributes = getRobotAttributeModifier(gameState, robotId, AttributesTypeEnum.CPU);
  const fromStatistics = getRobotStatisticValue(gameState, robotId, StatisticsTypeEnum.ACCURACY);
  return diceRolls(1, 20) + fromAttributes + fromStatistics;
}

export function resolveDodgeThreshold(gameState: Readonly<GameState>, robotId: string): number {
  const fromAttributes = getRobotAttributeModifier(gameState, robotId, AttributesTypeEnum.MOB);
  const fromStatistics = getRobotStatisticValue(gameState, robotId, StatisticsTypeEnum.DODGE);
  return 10 + fromAttributes + fromStatistics;
}

export function resolveRawDamage(gameState: Readonly<GameState>, robotId: string, baseDamage: number): number {
  const fromAttributes = getRobotAttributeModifier(gameState, robotId, AttributesTypeEnum.POW);
  const fromStatistics = getRobotStatisticValue(gameState, robotId, StatisticsTypeEnum.DAMAGE);
  return baseDamage + fromAttributes + fromStatistics;
}

export function resolveIsCritical(gameState: Readonly<GameState>, robotId: string): boolean {
  const critChance = getRobotStatisticValue(gameState, robotId, StatisticsTypeEnum.CRITICAL);
  return diceRolls(1, 100) <= critChance;
}

export function applyArmorAndReduction(
  gameState: Readonly<GameState>,
  targetRobotId: string,
  damage: number
): { finalDamage: number; defArmor: number } {
  const defArmor = getRobotStatisticValue(gameState, targetRobotId, StatisticsTypeEnum.ARMOR);
  const afterArmor = damage + (damage * defArmor) / 100;

  const reductionFromAttributes = getRobotAttributeModifier(gameState, targetRobotId, AttributesTypeEnum.CHS);
  const reductionFromStatistics = getRobotStatisticValue(gameState, targetRobotId, StatisticsTypeEnum.REDUCTION);
  const totalReduction = reductionFromAttributes + reductionFromStatistics;
  const finalDamage = afterArmor + (afterArmor * totalReduction) / 100;

  return { finalDamage, defArmor };
}

export function damageMitigationCalculator({
  gameState,
  sourceRobotId,
  targetRobotId,
  actionTypeEnum,
  actionElementTypeEnum,
  baseDamage,
}: DamageCalculatorParams): DamageResult {
  const isDodged = resolveDodgeThreshold(gameState, targetRobotId) > resolveHitChance(gameState, sourceRobotId);

  if (isDodged) {
    return { damageDealt: 0, isDodged: true, isCritical: false, defArmor: 0 };
  }

  const isCritical = resolveIsCritical(gameState, sourceRobotId);
  const rawDamage = resolveRawDamage(gameState, sourceRobotId, baseDamage);
  const hitDamage = isCritical ? rawDamage * 2 : rawDamage;

  const { finalDamage, defArmor } = applyArmorAndReduction(gameState, targetRobotId, hitDamage);

  return {
    damageDealt: finalDamage,
    isDodged: false,
    isCritical,
    defArmor,
  };
}

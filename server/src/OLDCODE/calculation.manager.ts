// import { AttributesTypeEnum, DamageTypeEnum, DiceUtils, GameFunctionsUtils, StatisticsTypeEnum } from 'shared';
//
// public static doDamage(
//   source: Robot,
//   target: Robot,
//   baseDamage: number,
//   damageType: DamageTypeEnum
// ): DamageActionOutput {
//   let amount: number;
//   let isDodged: boolean;
//   let isCritical: boolean;
//
//   const hitChanceFromAttributes = source.getAttributeModifier(AttributesTypeEnum.CPU);
//   const hitChanceFromStatistics = source.getStatisticModifier(StatisticsTypeEnum.ACCURACY);
//
//   const dodgeChanceFromAttributes = target.getAttributeModifier(AttributesTypeEnum.MOB);
//   const dodgeChanceFromStatistics = target.getStatisticModifier(StatisticsTypeEnum.DODGE);
//
//   const atkHitChance = DiceUtils.roll(1, 20) + hitChanceFromAttributes + hitChanceFromStatistics;
//   const defDodgeChance = 10 + dodgeChanceFromAttributes + dodgeChanceFromStatistics;
//   isDodged = defDodgeChance > atkHitChance;
//   if (isDodged) {
//     amount = 0;
//     isCritical = false;
//   } else {
//     const damageFromAttributes = source.getAttributeModifier(AttributesTypeEnum.POW);
//     const damageFromStatistics = source.getStatisticModifier(StatisticsTypeEnum.DAMAGE);
//     amount = baseDamage + damageFromAttributes + damageFromStatistics;
//     const critChanceFromStatistics = source.getStatisticModifier(StatisticsTypeEnum.CRITICAL);
//     const atkCritChance = DiceUtils.roll(1, 100);
//     isCritical = atkCritChance <= critChanceFromStatistics;
//     if (isCritical) {
//       amount *= 2;
//     }
//     const defArmor = target.getStatisticModifier(StatisticsTypeEnum.ARMOR);
//     amount = GameFunctionsUtils.mitigateDamageWithArmor(amount, defArmor);
//     const defRobustFromAttributes = target.getAttributeModifier(AttributesTypeEnum.CHS);
//     const defRobustFromStatistics = target.getStatisticModifier(StatisticsTypeEnum.REDUCTION);
//     const defRobust = defRobustFromAttributes + defRobustFromStatistics;
//     amount = GameFunctionsUtils.mitigateDamageWithRobust(amount, defRobust);
//   }
//   return buildDamageActionOutput({ amount, isDodged, isCritical, damageType });
// }
//
// public static doHeal(source: Robot, target: Robot, baseHeal: number): HealActionOutput {
//   let amount: number;
//   let isCritical: boolean;
//   const healFromAttributePower = source.getAttributeModifier(AttributesTypeEnum.POW);
//   const healFromAttributeCpu =
//     source.getAttributeModifier(AttributesTypeEnum.CPU) + target.getAttributeModifier(AttributesTypeEnum.CPU);
//   amount = baseHeal + healFromAttributePower + healFromAttributeCpu;
//   const critChanceFromStatistics = source.getStatisticModifier(StatisticsTypeEnum.CRITICAL);
//   const atkCritChance = DiceUtils.roll(1, 100);
//   isCritical = atkCritChance <= critChanceFromStatistics;
//   return buildHealActionOutput({ amount, isCritical });
// }
//
// public static doShield(source: Robot, target: Robot, baseShield: number): ActionOutput {
//   let amount: number;
//   const shieldFromAttributeCpu =
//     source.getAttributeModifier(AttributesTypeEnum.CPU) + target.getAttributeModifier(AttributesTypeEnum.CPU);
//   amount = baseShield + shieldFromAttributeCpu;
//   return buildShieldActionOutput({ amount });
// }

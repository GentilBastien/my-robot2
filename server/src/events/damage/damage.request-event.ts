import { RequestEvent } from '@events/request.event';
import { ContextEvent } from '@events/context.event';
import { DamageResponseEvent } from '@events/damage/damage.response-event';
import { ActionResultTypeEnum, ActionTypeEnum, AttributesTypeEnum, StatisticsTypeEnum } from 'shared';
import { diceRolls } from '@utils/dice.utils';

export class DamageRequestEvent implements RequestEvent {
  sourceRobotId: string;
  actionTypeEnum: ActionTypeEnum;
  actionResultTypeEnum: ActionResultTypeEnum;
  targetRobotId: string;
  baseDamage: number;

  constructor(
    sourceRobotId: string,
    actionTypeEnum: ActionTypeEnum,
    actionResultTypeEnum: ActionResultTypeEnum,
    targetRobotId: string,
    baseDamage: number
  ) {
    this.sourceRobotId = sourceRobotId;
    this.actionTypeEnum = actionTypeEnum;
    this.actionResultTypeEnum = actionResultTypeEnum;
    this.targetRobotId = targetRobotId;
    this.baseDamage = baseDamage;
  }

  public mapToResponse(context: ContextEvent): DamageResponseEvent {
    //TODO: The damage logic should lives in gameCalculator
    let damageDealt: number;
    let isCritical: boolean;
    let defArmor: number;

    const hitChanceFromAttributes = context.gameCalculator.getRobotAttributeModifier(
      context.gameState,
      this.sourceRobotId,
      AttributesTypeEnum.CPU
    );
    const hitChanceFromStatistics = context.gameCalculator.getRobotStatisticValue(
      context.gameState,
      this.sourceRobotId,
      StatisticsTypeEnum.ACCURACY
    );

    const dodgeChanceFromAttributes = context.gameCalculator.getRobotAttributeModifier(
      context.gameState,
      this.targetRobotId,
      AttributesTypeEnum.MOB
    );
    const dodgeChanceFromStatistics = context.gameCalculator.getRobotStatisticValue(
      context.gameState,
      this.targetRobotId,
      StatisticsTypeEnum.DODGE
    );

    const atkHitChance = diceRolls(1, 20) + hitChanceFromAttributes + hitChanceFromStatistics;
    const defDodgeChance = 10 + dodgeChanceFromAttributes + dodgeChanceFromStatistics;
    const isDodged = defDodgeChance > atkHitChance;
    if (isDodged) {
      damageDealt = 0;
      isCritical = false;
      defArmor = 0;
    } else {
      const damageFromAttributes = context.gameCalculator.getRobotAttributeModifier(
        context.gameState,
        this.sourceRobotId,
        AttributesTypeEnum.POW
      );
      const damageFromStatistics = context.gameCalculator.getRobotStatisticValue(
        context.gameState,
        this.sourceRobotId,
        StatisticsTypeEnum.DAMAGE
      );
      damageDealt = this.baseDamage + damageFromAttributes + damageFromStatistics;

      const critChanceFromStatistics = context.gameCalculator.getRobotStatisticValue(
        context.gameState,
        this.sourceRobotId,
        StatisticsTypeEnum.CRITICAL
      );
      const rollAtkCritChance = diceRolls(1, 100);
      isCritical = rollAtkCritChance <= critChanceFromStatistics;
      if (isCritical) {
        damageDealt *= 2;
      }
      defArmor = context.gameCalculator.getRobotStatisticValue(
        context.gameState,
        this.targetRobotId,
        StatisticsTypeEnum.ARMOR
      );
      damageDealt += (damageDealt * defArmor) / 100;
      const defRobustFromAttributes = context.gameCalculator.getRobotAttributeModifier(
        context.gameState,
        this.targetRobotId,
        AttributesTypeEnum.CHS
      );
      const defRobustFromStatistics = context.gameCalculator.getRobotStatisticValue(
        context.gameState,
        this.targetRobotId,
        StatisticsTypeEnum.REDUCTION
      );
      const defRobust = defRobustFromAttributes + defRobustFromStatistics;
      damageDealt += (damageDealt * defRobust) / 100;
    }

    return new DamageResponseEvent({
      responseValidated: true,
      damageType: this.damageType,
      sourceRobotId: this.sourceRobotId,
      targetRobotId: this.targetRobotId,
      actionTypeEnum: this.actionTypeEnum,
      damageDealt,
      isDodged,
      isCritical,
      armorEfficiency: defArmor,
    });
  }
}

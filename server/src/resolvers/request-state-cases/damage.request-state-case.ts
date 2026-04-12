import { AttributesTypeEnum, GameEventTypeEnum, GameState, StatisticsTypeEnum } from 'shared';
import { DamageResponseStateEvent } from '@events/response-state.event';
import { GameCalculator } from '@game/game-calculator/game.calculator';
import { RequestDamageStateEvent } from '@events/request-state.event';
import { diceRolls } from '@utils/dice.utils';

export function damageRequestStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  requestDamageStateEvent: RequestDamageStateEvent
): DamageResponseStateEvent {
  const { damageType, sourceRobotId, targetRobotId, actionTypeEnum, baseDamage } = requestDamageStateEvent;

  let damageDealt: number;
  let isCritical: boolean;
  let defArmor: number;

  const hitChanceFromAttributes = gameCalculator.getRobotAttributeModifier(
    readonlyGameState,
    sourceRobotId,
    AttributesTypeEnum.CPU
  );
  const hitChanceFromStatistics = gameCalculator.getRobotStatisticValue(
    readonlyGameState,
    sourceRobotId,
    StatisticsTypeEnum.ACCURACY
  );

  const dodgeChanceFromAttributes = gameCalculator.getRobotAttributeModifier(
    readonlyGameState,
    targetRobotId,
    AttributesTypeEnum.MOB
  );
  const dodgeChanceFromStatistics = gameCalculator.getRobotStatisticValue(
    readonlyGameState,
    targetRobotId,
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
    const damageFromAttributes = gameCalculator.getRobotAttributeModifier(
      readonlyGameState,
      sourceRobotId,
      AttributesTypeEnum.POW
    );
    const damageFromStatistics = gameCalculator.getRobotStatisticValue(
      readonlyGameState,
      sourceRobotId,
      StatisticsTypeEnum.DAMAGE
    );
    damageDealt = baseDamage + damageFromAttributes + damageFromStatistics;

    const critChanceFromStatistics = gameCalculator.getRobotStatisticValue(
      readonlyGameState,
      sourceRobotId,
      StatisticsTypeEnum.CRITICAL
    );
    const rollAtkCritChance = diceRolls(1, 100);
    isCritical = rollAtkCritChance <= critChanceFromStatistics;
    if (isCritical) {
      damageDealt *= 2;
    }
    defArmor = gameCalculator.getRobotStatisticValue(readonlyGameState, targetRobotId, StatisticsTypeEnum.ARMOR);
    damageDealt += (damageDealt * defArmor) / 100;
    const defRobustFromAttributes = gameCalculator.getRobotAttributeModifier(
      readonlyGameState,
      targetRobotId,
      AttributesTypeEnum.CHS
    );
    const defRobustFromStatistics = gameCalculator.getRobotStatisticValue(
      readonlyGameState,
      targetRobotId,
      StatisticsTypeEnum.REDUCTION
    );
    const defRobust = defRobustFromAttributes + defRobustFromStatistics;
    damageDealt += (damageDealt * defRobust) / 100;
  }

  return {
    gameEventType: GameEventTypeEnum.DAMAGE,
    responseValidated: true,
    damageType,
    sourceRobotId,
    targetRobotId,
    actionTypeEnum,
    damageDealt,
    isDodged,
    isCritical,
    armorEfficiency: defArmor,
  };
}

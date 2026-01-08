import { AttributesTypeEnum, StatisticsTypeEnum } from 'shared';
import { Robot } from '../game-entities/robot';

export class Damage {
  private source: Robot;
  private target: Robot;

  private damage: number = 0;
  private isDodged: boolean = false;
  private isCritical: boolean = false;

  constructor(source: Robot, target: Robot) {
    this.source = source;
    this.target = target;
  }

  private canHit(source: Robot, target: Robot): void {
    const hitChanceFromAttribute: number = source.getAttributeModifier(AttributesTypeEnum.CHS);
    const hitChanceFromStatistics: number = source.getStatisticModifier(StatisticsTypeEnum.ACCURACY);
  }
}

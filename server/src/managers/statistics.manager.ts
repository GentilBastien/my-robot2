import { RobotData, StatisticsTypeEnum } from 'shared';

export class StatisticsManager implements RobotData<StatisticsTypeEnum> {
  public map = new Map<StatisticsTypeEnum, number>([
    [StatisticsTypeEnum.HP, 0],
    [StatisticsTypeEnum.DAMAGE, 0],
    [StatisticsTypeEnum.ACCURACY, 0],
    [StatisticsTypeEnum.DODGE, 0],
    [StatisticsTypeEnum.CRITICAL, 0],
    [StatisticsTypeEnum.REDUCTION, 0],
    [StatisticsTypeEnum.ARMOR, 0],
    [StatisticsTypeEnum.MOVE_SPEED, 0],
  ]);

  public getModifier(stat: StatisticsTypeEnum): number {
    const value = this.map.get(stat);
    if (value !== undefined) {
      return value;
    }
    return 0;
  }

  public setPoint(stat: StatisticsTypeEnum, value: number): void {
    this.map.set(stat, value);
  }

  public addPoint(stat: StatisticsTypeEnum, value: number): void {
    const oldValue = this.map.get(stat);
    if (oldValue !== undefined) {
      this.map.set(stat, oldValue + value);
    }
  }
}

import { StatisticsEnum } from 'shared/dist/types/statistics.enum.js';

export class StatisticsManager {
  private statisticsMap = new Map<StatisticsEnum, number>([
    [StatisticsEnum.HP, 0],
    [StatisticsEnum.DAMAGE, 0],
    [StatisticsEnum.ACCURACY, 0],
    [StatisticsEnum.DODGE, 0],
    [StatisticsEnum.CRITICAL, 0],
    [StatisticsEnum.REDUCTION, 0],
    [StatisticsEnum.ARMOR, 0],
    [StatisticsEnum.MOVE_SPEED, 0],
  ]);

  public getModifier(stat: StatisticsEnum): number {
    const value = this.statisticsMap.get(stat);
    if (value !== undefined) {
      return value;
    }
    return 0;
  }

  public setPoint(stat: StatisticsEnum, value: number): void {
    this.statisticsMap.set(stat, value);
  }

  public addPoint(stat: StatisticsEnum, value: number): void {
    const oldValue = this.statisticsMap.get(stat);
    if (oldValue !== undefined) {
      this.statisticsMap.set(stat, oldValue + value);
    }
  }
}

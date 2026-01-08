import { AttributesManager } from '../managers/attributes.manager';
import { StatisticsManager } from '../managers/statistics.manager';
import { AttributesTypeEnum, StatisticsTypeEnum } from 'shared';

export abstract class Robot {
  private readonly attributesManager = new AttributesManager();
  private readonly statisticsManager = new StatisticsManager();

  public getAttributeModifier(attribute: AttributesTypeEnum): number {
    return this.attributesManager.getModifier(attribute);
  }

  public getStatisticModifier(statistic: StatisticsTypeEnum): number {
    return this.statisticsManager.getModifier(statistic);
  }
}

import { AttributesTypeEnum, StatisticsTypeEnum, Updatable } from 'shared';
import { Effect } from '../temporal-states/effects/effect';
import { AttributesRobotManager } from '../managers/robot/attributes.robot-manager';
import { StatisticsRobotManager } from '../managers/robot/statistics.robot-manager';
import { EffectRobotManager } from '../managers/robot/effect.robot-manager';
import { ResourcesRobotManager } from '../managers/robot/resources.robot-manager';

export abstract class Robot implements Updatable {
  private readonly attributesManager = new AttributesRobotManager();
  private readonly statisticsManager = new StatisticsRobotManager();
  private readonly effectManager = new EffectRobotManager();
  private readonly resourcesManager = new ResourcesRobotManager();

  private _isAlive: boolean = true;

  public update(): void {
    if (this._isAlive) {
      this.effectManager.update();
      this.resourcesManager.update();
    }
  }

  public addEffect(effect: Effect): void {
    this.effectManager.add(effect);
  }

  public getAttributeModifier(attribute: AttributesTypeEnum): number {
    return this.attributesManager.getModifier(attribute);
  }

  public getStatisticModifier(statistic: StatisticsTypeEnum): number {
    return this.statisticsManager.getModifier(statistic);
  }
}

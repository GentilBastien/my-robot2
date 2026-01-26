import { AttributesRobotManager } from './attributes.robot-manager';
import { StatisticsRobotManager } from './statistics.robot-manager';
import { ResourcesRobotManager } from './resources.robot-manager';
import { AttributesTypeEnum, StatisticsTypeEnum } from 'shared';
import { Effect } from '../effects/effect';
import { Updatable } from '../../states/updatable';

export abstract class Robot {
  private readonly attributesManager: AttributesRobotManager; //should be events
  private readonly statisticsManager: StatisticsRobotManager; //should be events
  private readonly resourcesManager: ResourcesRobotManager; //should be events

  protected constructor() {
    this.attributesManager = new AttributesRobotManager();
    this.statisticsManager = new StatisticsRobotManager();
    this.resourcesManager = new ResourcesRobotManager();
  }

  public update(): void {
    // this.effectManager.update();
    this.resourcesManager.update();
  }

  // ---------
  // ATTRIBUTES
  // ---------

  public getAttributeModifier(attribute: AttributesTypeEnum): number {
    return this.attributesManager.getModifier(attribute);
  }

  // ---------
  // STATISTICS
  // ---------

  public getStatisticModifier(statistic: StatisticsTypeEnum): number {
    return this.statisticsManager.getModifier(statistic);
  }

  // ---------
  // EFFECTS
  // ---------

  public addEffect(effect: Effect): void {
    // this.effectManager.add(effect);
  }

  // ---------
  // RESOURCES MANAGEMENT
  // ---------

  public hasEnergyModule(): boolean {
    return this.resourcesManager.hasEnergyModule();
  }

  public useEnergyModule(): void {
    return this.resourcesManager.useEnergyModule();
  }

  public hp(value: number): void {
    this.resourcesManager.hp(value);
  }

  public mana(value: number): void {
    this.resourcesManager.mana(value);
  }

  public cooling(value: number, enableWhileOverheating: boolean = true): void {
    this.resourcesManager.cooling(value, enableWhileOverheating);
  }
}

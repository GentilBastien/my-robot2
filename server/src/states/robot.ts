import { AttributesTypeEnum, StatisticsTypeEnum } from 'shared';
import { AttributesRobotManager } from '../managers/robot/attributes.robot-manager';
import { StatisticsRobotManager } from '../managers/robot/statistics.robot-manager';
import { EffectRobotManager } from '../managers/robot/effect.robot-manager';
import { ResourcesRobotManager } from '../managers/robot/resources.robot-manager';
import { Updatable } from '../managers/updatable';
import { Effect } from '../entities/effects/effect';

export abstract class Robot implements Updatable {
  private readonly attributesManager: AttributesRobotManager;
  private readonly statisticsManager: StatisticsRobotManager;
  private readonly resourcesManager: ResourcesRobotManager;
  private readonly effectManager: EffectRobotManager;

  protected constructor() {
    this.attributesManager = new AttributesRobotManager();
    this.statisticsManager = new StatisticsRobotManager();
    this.resourcesManager = new ResourcesRobotManager();
    this.effectManager = new EffectRobotManager();
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

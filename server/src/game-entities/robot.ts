import { AttributesTypeEnum, StatisticsTypeEnum, Updatable } from 'shared';
import { Effect } from '../temporal-states/effects/effect';
import { AttributesRobotManager } from '../managers/robot/attributes.robot-manager';
import { StatisticsRobotManager } from '../managers/robot/statistics.robot-manager';
import { EffectRobotManager } from '../managers/robot/effect.robot-manager';
import { ResourcesRobotManager } from '../managers/robot/resources.robot-manager';
import { Action } from '../action/action';

export abstract class Robot implements Updatable {
  private readonly attributesManager = new AttributesRobotManager();
  private readonly statisticsManager = new StatisticsRobotManager();
  private readonly effectManager = new EffectRobotManager();
  private readonly resourcesManager = new ResourcesRobotManager();

  public update(): void {
    this.effectManager.update();
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
    this.effectManager.add(effect);
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

  public checkResourcesForAction(action: Action): boolean {
    return this.resourcesManager.checkResourcesForAction(action);
  }
}

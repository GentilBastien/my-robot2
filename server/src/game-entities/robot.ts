import { AttributesManager } from '../managers/attributes.manager';
import { StatisticsManager } from '../managers/statistics.manager';
import { EffectManager } from '../managers/effect.manager';
import { AttributesTypeEnum, Coordinates, StatisticsTypeEnum, Updatable } from 'shared';
import { Effect } from '../temporal-states/effects/effect';
import { ArenaManager } from '../managers/arena.manager';
import { Tile } from '../tiles/tile';
import { HexagonalGridStructure } from '../structures/hexagonal-grid/hexagonal-grid.structure';
import { Action } from '../action/action';
import { ActionManager } from '../managers/action.manager';
import { ResourcesManager } from '../managers/resouces.manager';

export abstract class Robot implements Updatable {
  private readonly attributesManager = new AttributesManager();
  private readonly statisticsManager = new StatisticsManager();
  private readonly effectManager = new EffectManager();
  private readonly resourcesManager = new ResourcesManager();
  private readonly arenaManager = new ArenaManager();
  private readonly actionManager = new ActionManager(this);

  private _isAlive: boolean = true;

  public update(): void {
    if (this._isAlive) {
      this.effectManager.update();
      this.resourcesManager.update();
    }
  }

  public doAction(action: Action): void {}

  public get location(): Coordinates {
    return this.arenaManager.location();
  }

  public rangeTo(otherRobot: Robot): number {
    // return this.arenaManager.
    return 0;
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

  public enterArena(arena: HexagonalGridStructure<Tile>): void {
    this.arenaManager.enterArena(arena);
  }
}

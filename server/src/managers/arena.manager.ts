import { HexagonalGridStructure } from '../structures/hexagonal-grid/hexagonal-grid.structure';
import { Tile } from '../tiles/tile';
import { Coordinates, Updatable } from 'shared';

export class ArenaManager implements Updatable {
  update(): void {
    throw new Error('Method not implemented.');
  }
  private arena: HexagonalGridStructure<Tile> | undefined;

  public enterArena(arena: HexagonalGridStructure<Tile>): void {
    this.arena = arena;
  }

  public location(): Coordinates {
    return { x: 0, y: 0, z: 0 };
  }

  // public rangeTo(otherRobot: Robot): number {
  //   if (this.arena) {
  //     return otherRobot.rangeTo(otherRobot);
  //   }
  //   return 0;
  // }

  // public actionInRange(action: Action): boolean {
  //   if (this.arena) {
  //     const sourceCell = this.arena.getCellAt(action.source.location);
  //     const targetCell = this.arena.getCellAt(action.target.location);
  //     return this.arena.getCellsInRadius(sourceCell, action.range).includes(targetCell);
  //   }
  //   return false;
  // }
}

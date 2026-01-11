import { HexagonalGridStructure } from '../structures/hexagonal-grid/hexagonal-grid.structure';
import { Tile } from '../tiles/tile';
import { Action } from '../action/action';
import { Coordinates } from 'shared';

export class ArenaManager {
  private arena: HexagonalGridStructure<Tile> | undefined;

  public enterArena(arena: HexagonalGridStructure<Tile>): void {
    this.arena = arena;
  }

  public location(): Coordinates {
    return { x: 0, y: 0, z: 0 };
  }

  public actionInRange(action: Action): boolean {
    if (this.arena) {
      const sourceCell = this.arena.getCellAt(action.source.location);
      const targetCell = this.arena.getCellAt(action.target.location);
      return this.arena.getCellsInRadius(sourceCell, action.range).includes(targetCell);
    }
    return false;
  }
}

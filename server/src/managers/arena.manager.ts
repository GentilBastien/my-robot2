import { HexagonalGridStructure } from '../structures/hexagonal-grid/hexagonal-grid.structure';
import { Tile } from '../tiles/tile';
import { Coordinates } from 'shared';
import { Updatable } from '../states/updatable';
import { Robot } from '../entities/robot/robot';

interface RobotLocation {
  robot: Robot;
  coordinates: Coordinates;
}

export class ArenaManager implements Updatable {
  private readonly arena: HexagonalGridStructure<Tile>;
  private readonly robots: RobotLocation[];

  constructor(robots: Robot[]) {
    this.arena = new HexagonalGridStructure<Tile>(10, 10);
    this.robots = [];
  }

  public update(): void {}

  private mapToRobotLocation(robot: Robot): RobotLocation {
    return {
      robot,
      coordinates: { x: 0, y: 0, z: 0 },
    };
  }

  public location(robot: Robot): Coordinates {
    return { x: 0, y: 0, z: 0 };
  }

  public inRange(): boolean {
    return true;
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

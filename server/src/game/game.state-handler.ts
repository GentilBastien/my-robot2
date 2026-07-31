import { HexagonalGridStructure } from '@structures/hexagonal-grid/hexagonal-grid.structure';
import { CellState, Comparator, GameState, RobotState } from 'shared';
import { CyclicListStructure } from '@structures/cyclic-list/cyclic-list.structure';
import { GameConfig } from '@game/game.config';

export class GameStateHandler {
  public readonly hexagonalGridState: HexagonalGridStructure<CellState>;
  public readonly cyclicListState: CyclicListStructure<RobotState>;

  constructor(gameConfig: GameConfig) {
    const robotComparator: Comparator<RobotState> = (_robot1: RobotState, _robot2: RobotState): number => 1;
    this.hexagonalGridState = new HexagonalGridStructure<CellState>(gameConfig.mapWidth, gameConfig.mapHeight);
    this.cyclicListState = new CyclicListStructure<RobotState>(robotComparator);
  }

  public updateHexagonalGridState(gameState: GameState): void {
    this.hexagonalGridState.setAllCellItems(gameState.arenaState.cells);
  }

  public updateCyclicListState(gameState: GameState): void {
    const robots: RobotState[] = Object.values(gameState.robots);
    for (const robot of robots) {
      this.cyclicListState.insertItem(robot);
    }
    this.cyclicListState.next();
  }
}

import { HexagonalGridStructure } from '@structures/hexagonal-grid/hexagonal-grid.structure';
import { Comparator, Coordinates, PathCoordinate, Weight } from 'shared';
import { CyclicListStructure } from '@structures/cyclic-list/cyclic-list.structure';
import { ActionInstance } from '@entities/actions/action-instance';
import { GameState } from '@states/game.state';
import { RobotState } from '@states/robot.state';
import { GameCalculatorInterface } from './game.calculator.interface';
import { GameConfig } from '../game.config';

type InitiativeRobot = {
  robotId: string;
  initiative: number;
};

export class GameCalculator implements GameCalculatorInterface {
  private readonly hexGrid: HexagonalGridStructure<Weight>;
  private readonly turnOrder: CyclicListStructure<InitiativeRobot>;

  constructor(gameConfig: GameConfig) {
    this.hexGrid = new HexagonalGridStructure<Weight>(gameConfig.mapWidth, gameConfig.mapHeight);
    const robotComparator: Comparator<InitiativeRobot> = {
      compare(robot1: InitiativeRobot, robot2: InitiativeRobot): number {
        return robot1.initiative - robot2.initiative;
      },
    };
    this.turnOrder = new CyclicListStructure<InitiativeRobot>(robotComparator);
  }

  public actionInRange(gameState: Readonly<GameState>, actionInstance: ActionInstance): boolean {
    const source = this.getRobotCoordinates(gameState, actionInstance.sourceRobotId);
    const target = this.getRobotCoordinates(gameState, actionInstance.targetRobotId);
    const hexCellSource = this.hexGrid.getCellAt(source);
    const hexCellTarget = this.hexGrid.getCellAt(target);
    return this.hexGrid.isCellInRange(hexCellSource, actionInstance.action.range, hexCellTarget);
  }

  public getRobotState(gameState: Readonly<GameState>, robotId: string): RobotState {
    const robotFound = gameState.robots.find(robot => robot.id === robotId);
    if (robotFound) {
      return robotFound;
    }
    throw 'Temp error';
  }

  public getRobotCoordinates(gameState: Readonly<GameState>, robotId: string): Coordinates {
    const robotFound = gameState.arenaState.robotPositions.get(robotId);
    if (robotFound) {
      return robotFound;
    }
    throw 'Temp error';
  }

  public isRobotTurnToPlay(robotId: string): boolean {
    const robotToPlay = this.turnOrder.currentItem;
    if (robotToPlay) {
      return this.turnOrder.currentItem?.robotId === robotId;
    }
    throw 'Temp error';
  }

  public advanceTurn(): void {
    this.turnOrder.next();
  }

  public possibleTargets(gameState: Readonly<GameState>, robotId: string): PathCoordinate[] {
    const robotState = this.getRobotState(gameState, robotId);
    const robotCoordinates = this.getRobotCoordinates(gameState, robotId);
    const robotCell = this.hexGrid.getCellAt(robotCoordinates);
    return this.hexGrid.possiblePaths(robotCell, robotState.resources.remainingMove);
  }

  public robotTakeMove(gameState: Readonly<GameState>, robotId: string, pathCoordinate: PathCoordinate): void {}
}

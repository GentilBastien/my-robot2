import { HexagonalGridStructure } from '@structures/hexagonal-grid/hexagonal-grid.structure';
import { Comparator, GameState, RobotState, TurnState, Weight } from 'shared';
import { CyclicListStructure } from '@structures/cyclic-list/cyclic-list.structure';
import { GameConfig } from '../game.config';

type InitiativeRobot = {
  id: string;
  initiative: number;
};

export class GameCalculator {
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

  public getRobotState(gameState: Readonly<GameState>, robotId: string): RobotState {
    const robotFound = gameState.robots[robotId];
    if (robotFound) {
      return robotFound;
    }
    throw 'Temp error';
  }

  public getRobotPlayingId(): string {
    const robotPlaying = this.turnOrder.currentItem;
    if (robotPlaying) {
      return robotPlaying.id;
    }
    throw 'Temp error';
  }

  public canAdvanceTurn(gameState: Readonly<GameState>, sourceRobotId: string): boolean {
    const robotPlayingId = this.getRobotPlayingId();
    return this.getRobotState(gameState, sourceRobotId).id === robotPlayingId;
  }

  public newTurnState(gameState: Readonly<GameState>): TurnState {
    const robotToPlay = this.turnOrder.nextItem;
    if (robotToPlay) {
      return {
        currentTurnNumber: gameState.turnState.currentTurnNumber + 1,
        currentTurnRobot: this.getRobotState(gameState, robotToPlay.id),
      };
    }
    throw new Error('Temp error');
  }

  public advanceTurn(): void {
    this.turnOrder.next();
  }

  // public getRobotCoordinates(gameState: Readonly<GameState>, robotId: string): Coordinates {
  //   return this.getRobotState(gameState, robotId).coordinates;
  // }

  // public getPossibleTargets(gameState: Readonly<GameState>, robotId: string): PathCoordinate[] {
  //   const robotState = this.getRobotState(gameState, robotId);
  //   const robotCoordinates = this.getRobotCoordinates(gameState, robotId);
  //   const robotCell = this.hexGrid.getCellAt(robotCoordinates);
  //   return this.hexGrid.possiblePaths(robotCell, robotState.resources.remainingMove);
  // }
}

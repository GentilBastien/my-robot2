import { HexagonalGridStructure } from '@structures/hexagonal-grid/hexagonal-grid.structure';
import {
  CellState,
  Comparator,
  Coordinates,
  EqualsUtils,
  GameState,
  PathCoordinate,
  RobotState,
  TurnState,
  TurnStateTypeEnum,
  Weight,
} from 'shared';
import { CyclicListStructure } from '@structures/cyclic-list/cyclic-list.structure';
import { GameConfig } from '../game.config';
import { EffectInstance } from '@entities/effects/effect-instance';

interface InitiativeRobot {
  id: string;
  initiative: number;
}

export class GameCalculator {
  private readonly hexGrid: HexagonalGridStructure<Weight>;
  private readonly turnOrder: CyclicListStructure<InitiativeRobot>;
  private readonly activeEffects: EffectInstance[];

  constructor(gameConfig: GameConfig) {
    this.hexGrid = new HexagonalGridStructure<Weight>(gameConfig.mapWidth, gameConfig.mapHeight);
    const robotComparator: Comparator<InitiativeRobot> = {
      compare(robot1: InitiativeRobot, robot2: InitiativeRobot): number {
        return robot1.initiative - robot2.initiative;
      },
    };
    this.turnOrder = new CyclicListStructure<InitiativeRobot>(robotComparator);
    this.activeEffects = [];
  }

  public getRobotState(gameState: Readonly<GameState>, robotId: string): RobotState {
    return gameState.robots[robotId];
  }

  public getCellState(gameState: Readonly<GameState>, cellId: string): CellState {
    return gameState.arenaState.cells[cellId];
  }

  public getCellStateByCoordinate(gameState: Readonly<GameState>, coordinates: Coordinates): CellState {
    const cells = gameState.arenaState.cells;
    const cellIdFound = Object.keys(cells).find(cellId =>
      EqualsUtils.coordinateEquals(cells[cellId].coordinates, coordinates)
    );
    if (cellIdFound) {
      return cells[cellIdFound];
    }
    throw 'temp error';
  }

  public getRobotPlayingId(): string {
    const robotPlaying = this.turnOrder.currentItem;
    if (robotPlaying) {
      return robotPlaying.id;
    }
    throw 'Temp error';
  }

  public getTurnNumber(gameState: Readonly<GameState>): number {
    return gameState.turnState.currentTurnNumber;
  }

  public getActiveEffectInstances(gameState: Readonly<GameState>): EffectInstance[] {
    return this.activeEffects.filter(activeEffect => gameState.effectState.activeEffectIds.includes(activeEffect.id));
  }

  public getActiveEffectInstancesAtCoordinates(
    gameState: Readonly<GameState>,
    coordinates: Coordinates
  ): EffectInstance[] {
    const cellIdInPath = this.getCellStateByCoordinate(gameState, coordinates).id;
    const activeEffectInstances = this.getActiveEffectInstances(gameState);
    return activeEffectInstances.filter(activeEffectInstance => activeEffectInstance.tileId === cellIdInPath);
  }

  public isRobotTurn(gameState: Readonly<GameState>, robotId: string): boolean {
    const robotPlayingId = this.getRobotPlayingId();
    return this.getRobotState(gameState, robotId).id === robotPlayingId;
  }

  public newTurnState(gameState: Readonly<GameState>): TurnState {
    const robotToPlay = this.turnOrder.nextItem;
    if (robotToPlay) {
      return {
        turnStateTypeEnum: TurnStateTypeEnum.PENDING,
        currentTurnNumber: gameState.turnState.currentTurnNumber + 1,
        currentTurnRobot: this.getRobotState(gameState, robotToPlay.id),
      };
    }
    throw new Error('Temp error');
  }

  public advanceTurn(): void {
    this.turnOrder.next();
  }

  public getRobotCoordinates(gameState: Readonly<GameState>, robotId: string): Coordinates {
    const robotCellId = this.getRobotState(gameState, robotId).cellId;
    return gameState.arenaState.cells[robotCellId].coordinates;
  }

  public getPathCoordinateToTarget(
    gameState: Readonly<GameState>,
    robotId: string,
    target: Coordinates
  ): PathCoordinate | null {
    const startCell = this.hexGrid.getCellAt(this.getRobotCoordinates(gameState, robotId));
    const targetCell = this.hexGrid.getCellAt(target);
    return this.hexGrid.shortestPathTo(startCell, targetCell);
  }

  public getPossibleTargets(gameState: Readonly<GameState>, robotId: string): PathCoordinate[] {
    const robotState = this.getRobotState(gameState, robotId);
    const robotCoordinates = this.getRobotCoordinates(gameState, robotId);
    const robotCell = this.hexGrid.getCellAt(robotCoordinates);
    return this.hexGrid.possiblePaths(robotCell, robotState.resources.remainingMove);
  }
}

import { HexagonalGridStructure } from '@structures/hexagonal-grid/hexagonal-grid.structure';
import {
  CellState,
  Comparator,
  Coordinates,
  EqualsUtils,
  GameState,
  PathCoordinate,
  ResourcesState,
  RobotState,
  StepPathCoordinate,
  TurnState,
  TurnStateTypeEnum,
  Weight,
} from 'shared';
import { CyclicListStructure } from '@structures/cyclic-list/cyclic-list.structure';
import { GameConfig } from '../game.config';
import { EffectState } from '../../../../shared/src/states/effect.state';
import { Effect } from '@entities/effects/effect';
import { allEffects } from '@entities/effects/in-game-effects/in-game-effects';

interface InitiativeRobot {
  id: string;
  initiative: number;
}

export class GameCalculator {
  private readonly hexGrid: HexagonalGridStructure<Weight>;
  private readonly turnOrder: CyclicListStructure<InitiativeRobot>;
  private readonly activeEffects: EffectState[];

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

  public getResourcesState(gameState: Readonly<GameState>, robotId: string): ResourcesState {
    return gameState.robots[robotId].resources;
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

  public getEffect(effectState: EffectState): Effect {
    return allEffects[effectState.effectId];
  }

  public getEffectStatesFromRobot(gameState: Readonly<GameState>, robotId: string): EffectState[] {
    return gameState.effects.filter(effect => effect.sourceId === robotId);
  }

  public getEffectStatesFromRobotCell(gameState: Readonly<GameState>, robotId: string): EffectState[] {
    const robotCoordinates = this.getRobotCoordinates(gameState, robotId);
    return this.getEffectStatesAtCoordinates(gameState, robotCoordinates);
  }

  public getEffectStatesAtCoordinates(gameState: Readonly<GameState>, coordinates: Coordinates): EffectState[] {
    const cellStateId: string = this.getCellStateByCoordinate(gameState, coordinates).id;
    return gameState.effects.filter(effectState => effectState.cellId === cellStateId);
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

  public getPathCoordinateCost(pathCoordinate: PathCoordinate): number {
    let sum = 0;
    for (let i = 1; i < pathCoordinate.costs.length; i++) {
      sum += pathCoordinate.costs[i];
    }
    return sum;
  }

  public splitPathInSteps(path: PathCoordinate): StepPathCoordinate[] {
    const stepPathCoordinates: StepPathCoordinate[] = [];
    for (let i = 0; i < path.coordinatesPath.length - 1; i++) {
      const startCoordinates: Coordinates = path.coordinatesPath[i];
      const endCoordinates: Coordinates = path.coordinatesPath[i + 1];
      const stepCost: number = path.costs[i + 1];
      const stepPathCoordinate: StepPathCoordinate = {
        startCoordinates,
        endCoordinates,
        cost: stepCost,
      };
      stepPathCoordinates.push(stepPathCoordinate);
    }
    return stepPathCoordinates;
  }

  public pathCoordinateIsOneStep(pathCoordinate: PathCoordinate): StepPathCoordinate | undefined {
    if (pathCoordinate.coordinatesPath.length === 2 && pathCoordinate.costs.length === 2) {
      return {
        startCoordinates: pathCoordinate.coordinatesPath[0],
        endCoordinates: pathCoordinate.coordinatesPath[1],
        cost: pathCoordinate.costs[1],
      };
    }
    return undefined;
  }

  public getPossibleTargets(gameState: Readonly<GameState>, robotId: string): PathCoordinate[] {
    const robotState = this.getRobotState(gameState, robotId);
    const robotCoordinates = this.getRobotCoordinates(gameState, robotId);
    const robotCell = this.hexGrid.getCellAt(robotCoordinates);
    return this.hexGrid.possiblePaths(robotCell, robotState.resources.remainingMove);
  }
}

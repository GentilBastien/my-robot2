import { HexagonalGridStructure } from '@structures/hexagonal-grid/hexagonal-grid.structure';
import {
  ActionTypeEnum,
  AttributesState,
  AttributesTypeEnum,
  CellState,
  Comparator,
  Coordinates,
  EffectState,
  GameState,
  MovementTypeEnum,
  PathCostCoordinate,
  ResourcesState,
  RobotState,
  RobotStateTypeEnum,
  StatisticsState,
  StatisticsTypeEnum,
  StepPathCostCoordinate,
  TurnState,
  TurnStateTypeEnum,
} from 'shared';
import { CyclicListStructure } from '@structures/cyclic-list/cyclic-list.structure';
import { Effect } from '@entities/effects/effect';
import { Action } from '@entities/actions/action';
import { ActionResponseErrors } from '@entities/actions/action-responses/action-response-errors';
import { GameConfig } from '../game.config';
import { actionList } from '@entities/actions/action-list/action.list';
import { effectList } from '@entities/effects/effect-list/effect.list';

interface InitiativeRobot {
  id: string;
  initiative: number;
  dead: boolean;
}

export class GameCalculator {
  private readonly hexGrid: HexagonalGridStructure<CellState>;
  private readonly cyclicList: CyclicListStructure<InitiativeRobot>;

  constructor(gameConfig: GameConfig) {
    this.hexGrid = new HexagonalGridStructure<CellState>(gameConfig.mapWidth, gameConfig.mapHeight);
    const robotComparator: Comparator<InitiativeRobot> = (robot1: InitiativeRobot, robot2: InitiativeRobot): number =>
      robot1.initiative - robot2.initiative;
    this.cyclicList = new CyclicListStructure<InitiativeRobot>(robotComparator);
  }

  public update_1(gameState: GameState): void {
    this.hexGrid.setAllCellItems(gameState.arenaState.cells);
  }

  public update_2(gameState: GameState): void {
    const robots: RobotState[] = Object.values(gameState.robots);
    for (const robot of robots) {
      this.cyclicList.insertItem({
        id: robot.id,
        initiative: robot.attributes.mobility,
        dead: robot.selfStates.includes(RobotStateTypeEnum.DEATH),
      });
    }
    this.cyclicList.next();
  }

  public getShortestPathTo(
    gameState: Readonly<GameState>,
    robotId: string,
    target: Coordinates
  ): PathCostCoordinate | null {
    const robotCoordinates = this.getRobotCoordinates(gameState, robotId);
    const startCell = this.hexGrid.getCellAt(robotCoordinates);
    const targetCell = this.hexGrid.getCellAt(target);
    return this.hexGrid.shortestPathTo(startCell, targetCell);
  }

  public getPossiblePaths(gameState: Readonly<GameState>, robotId: string): PathCostCoordinate[] {
    const robotState = this.getRobotState(gameState, robotId);
    const robotCoordinates = this.getRobotCoordinates(gameState, robotId);
    const robotCell = this.hexGrid.getCellAt(robotCoordinates);
    console.log('getPossiblePaths remaining move: ', robotState.resources.remainingMove);
    return this.hexGrid.possiblePaths(robotCell, robotState.resources.remainingMove);
  }

  public getCellStateAtCoordinates(coordinates: Coordinates): CellState {
    return this.hexGrid.getCellAt(coordinates).item;
  }

  public getRobotState(gameState: Readonly<GameState>, robotId: string): RobotState {
    return gameState.robots[robotId];
  }

  public getRobotSelfStates(gameState: Readonly<GameState>, robotId: string): RobotStateTypeEnum[] {
    return gameState.robots[robotId].selfStates;
  }

  public getRobotResourcesState(gameState: Readonly<GameState>, robotId: string): ResourcesState {
    return gameState.robots[robotId].resources;
  }

  public getRobotAttributeState(gameState: Readonly<GameState>, robotId: string): AttributesState {
    return gameState.robots[robotId].attributes;
  }

  public getRobotStatisticState(gameState: Readonly<GameState>, robotId: string): StatisticsState {
    return gameState.robots[robotId].statistics;
  }

  public getPlayingRobotId(): string {
    const robotPlaying = this.cyclicList.currentItem;
    if (robotPlaying) {
      return robotPlaying.id;
    }
    throw 'Temp error';
  }

  public getTurnNumber(gameState: Readonly<GameState>): number {
    return gameState.turnState.currentTurnNumber;
  }

  public getAction(actionTypeEnum: ActionTypeEnum): Action {
    const actionFound: Action | undefined = actionList[actionTypeEnum];
    if (actionFound) {
      return actionFound;
    }
    throw 'Temp error';
  }

  public getEffect(effectState: EffectState): Effect {
    return effectList[effectState.effectId];
  }

  public getEffectStateById(gameState: Readonly<GameState>, effectStateId: string): EffectState {
    const effectStateFound: EffectState | undefined = gameState.effects.find(eff => eff.id === effectStateId);
    if (effectStateFound) {
      return effectStateFound;
    }
    throw 'temp error';
  }

  public getEffectStatesFromRobot(gameState: Readonly<GameState>, robotId: string): EffectState[] {
    return gameState.effects.filter(effect => effect.sourceRobotId === robotId);
  }

  public getEffectStatesFromRobotCell(gameState: Readonly<GameState>, robotId: string): EffectState[] {
    const robotCoordinates = this.getRobotCoordinates(gameState, robotId);
    return this.getEffectStatesAtCoordinates(gameState, robotCoordinates);
  }

  public getEffectStatesAtCoordinates(gameState: Readonly<GameState>, coordinates: Coordinates): EffectState[] {
    return gameState.effects.filter(effectState => effectState.targetCoordinates === coordinates);
  }

  public isRobotTurn(robotId: string): boolean {
    const playingRobotId = this.getPlayingRobotId();
    return robotId === playingRobotId;
  }

  public getPlayingRobotState(gameState: Readonly<GameState>): RobotState {
    return this.getRobotState(gameState, this.getPlayingRobotId());
  }

  public hasEnoughMana(resourcesState: ResourcesState, action: Action): boolean {
    return resourcesState.mana >= (action.manaCost ?? 0);
  }

  public hasEnoughActionResource(resourcesState: ResourcesState, action: Action): boolean {
    return (
      resourcesState.remainingActions >= (action.actionCost ?? 0) &&
      resourcesState.remainingSubActions >= (action.subActionCost ?? 0)
    );
  }

  public robotAllowedForAction(gameState: Readonly<GameState>, robotId: string, action: Action): ActionResponseErrors {
    const response: ActionResponseErrors = {};
    const isRobotTurn = this.isRobotTurn(robotId);
    if (!isRobotTurn) {
      response.wrongTurn = { robotTurnId: this.getPlayingRobotId() };
    }
    const resourcesState = this.getRobotResourcesState(gameState, robotId);
    const isRobotOverheating = resourcesState.isOverheating;
    if (isRobotOverheating) {
      response.robotOverheating = { overheating: resourcesState.overheating };
    }
    const robotHasEnoughAction = this.hasEnoughActionResource(resourcesState, action);
    if (!robotHasEnoughAction) {
      response.noEnoughAction = { cost: action.actionCost ?? 0, available: resourcesState.totalActions };
    }
    const robotHasEnoughMana = this.hasEnoughMana(resourcesState, action);
    if (!robotHasEnoughMana) {
      response.noEnoughMana = { cost: action.manaCost ?? 0, available: resourcesState.mana };
    }
    const robotHasEnoughRange = true; //TODO Range
    if (!robotHasEnoughRange) {
      response.noEnoughRange = { cost: action.range, available: 0 };
    }
    const robotHasVision = !action.needVision || (action.needVision && true); //TODO
    if (!robotHasVision) {
      response.noVision = { invisible: true };
    }
    return response;
  }

  /**
   * Returns the (possible) previously equal affected EffectState;
   */
  public getEffectStateIfTargetAlreadyAffectedBy(
    gameState: Readonly<GameState>,
    newEffectState: EffectState
  ): EffectState | undefined {
    return gameState.effects.find(
      effectState =>
        effectState.effectId === newEffectState.effectId &&
        (effectState.targetRobotId === newEffectState.targetRobotId ||
          effectState.targetCoordinates === newEffectState.targetCoordinates)
    );
  }

  public newTurnState(gameState: Readonly<GameState>): TurnState {
    const robotToPlay = this.cyclicList.currentItem;
    if (robotToPlay) {
      return {
        turnStateTypeEnum: TurnStateTypeEnum.STARTED,
        currentTurnNumber: gameState.turnState.currentTurnNumber + 1,
        currentTurnRobotId: robotToPlay.id,
      };
    }
    throw new Error('Temp error');
  }

  public advanceTurn(): InitiativeRobot {
    return this.cyclicList.next();
  }

  public getRobotCoordinates(gameState: Readonly<GameState>, robotId: string): Coordinates {
    return this.getRobotState(gameState, robotId).coordinates;
  }

  public mapPathToPathWithCost(path: Coordinates[]): PathCostCoordinate {
    const hexCells = path.map(coordinates => this.hexGrid.getCellAt(coordinates));
    return {
      costs: hexCells.map(hexCell => hexCell.weight),
      coordinatesPath: path,
    };
  }

  public getPathCoordinateCost(pathCoordinate: PathCostCoordinate): number {
    let sum = 0;
    for (let i = 1; i < pathCoordinate.costs.length; i++) {
      sum += pathCoordinate.costs[i];
    }
    return sum;
  }

  public movementTypeAllowedForRobot(
    gameState: Readonly<GameState>,
    robotId: string,
    movementType: MovementTypeEnum
  ): boolean {
    //TODO: impl function
    // const robot = this.getRobotState(gameState, robotId);
    return true;
  }

  /**
   * Loop through all the possible sources of visibility and get the visible cells and flat them with no duplicates.
   */
  public getVisibleCells(gameState: Readonly<GameState>, robotId: string): Set<string> {
    const proximityVision = this.getVisibleCellsByProximity(gameState, robotId);
    const droidProbeVision = this.getVisibleCellsFromDroidProbe();
    const allVisibilityCells = [proximityVision, droidProbeVision].flat();
    return new Set<string>(allVisibilityCells);
  }

  public getVisibleCellsByProximity(gameState: Readonly<GameState>, robotId: string): string[] {
    const robotHexCell = this.hexGrid.getCellAt(this.getRobotCoordinates(gameState, robotId));
    const robotVisionHexCells = this.hexGrid.getCellsInRange(robotHexCell, 2);
    return robotVisionHexCells.map(hexCell => hexCell.item.id);
  }

  public getVisibleCellsFromDroidProbe(): string[] {
    return [];
  }

  /**
   * Returns true if the given path will actually result in a movement.
   * Moving to the same coordinate where the robot already is will be considered as no movement.
   */
  public pathResultsInMovement(gameState: Readonly<GameState>, robotId: string, coordinates: Coordinates[]): boolean {
    if (coordinates.length === 0) {
      return false;
    }
    const robotCoordinates: Coordinates = this.getRobotCoordinates(gameState, robotId);
    return coordinates.length > 1 || !this.hexGrid.getCellAt(robotCoordinates).isLocatedAt(coordinates[0]);
  }

  public splitPathInSteps(path: PathCostCoordinate): StepPathCostCoordinate[] {
    const stepPathCoordinates: StepPathCostCoordinate[] = [];
    for (let i = 0; i < path.coordinatesPath.length - 1; i++) {
      const startCoordinates: Coordinates = path.coordinatesPath[i];
      const endCoordinates: Coordinates = path.coordinatesPath[i + 1];
      const stepCost: number = path.costs[i + 1];
      const stepPathCoordinate: StepPathCostCoordinate = {
        startCoordinates,
        endCoordinates,
        cost: stepCost,
      };
      stepPathCoordinates.push(stepPathCoordinate);
    }
    return stepPathCoordinates;
  }

  public pathCoordinateIsOneStep(pathCoordinate: PathCostCoordinate): StepPathCostCoordinate | undefined {
    if (pathCoordinate.coordinatesPath.length === 2 && pathCoordinate.costs.length === 2) {
      return {
        startCoordinates: pathCoordinate.coordinatesPath[0],
        endCoordinates: pathCoordinate.coordinatesPath[1],
        cost: pathCoordinate.costs[1],
      };
    }
    return undefined;
  }

  public getRobotAttributeValue(
    gameState: Readonly<GameState>,
    robotId: string,
    attributesTypeEnum: AttributesTypeEnum
  ): number {
    const attrState = this.getRobotAttributeState(gameState, robotId);
    switch (attributesTypeEnum) {
      case AttributesTypeEnum.POW:
        return attrState.power;
      case AttributesTypeEnum.MOB:
        return attrState.mobility;
      case AttributesTypeEnum.CHS:
        return attrState.chassis;
      case AttributesTypeEnum.CPU:
        return attrState.cpu;
      case AttributesTypeEnum.ENE:
        return attrState.energy;
      case AttributesTypeEnum.INTF:
        return attrState.interface;
    }
  }

  public getRobotStatisticValue(
    gameState: Readonly<GameState>,
    robotId: string,
    statisticsTypeEnum: StatisticsTypeEnum
  ): number {
    const statState = this.getRobotStatisticState(gameState, robotId);
    switch (statisticsTypeEnum) {
      case StatisticsTypeEnum.HP:
        return statState.hp;
      case StatisticsTypeEnum.DAMAGE:
        return statState.damage;
      case StatisticsTypeEnum.ACCURACY:
        return statState.accuracy;
      case StatisticsTypeEnum.DODGE:
        return statState.dodge;
      case StatisticsTypeEnum.CRITICAL:
        return statState.critical;
      case StatisticsTypeEnum.REDUCTION:
        return statState.reduction;
      case StatisticsTypeEnum.ARMOR:
        return statState.armor;
      case StatisticsTypeEnum.MOVE_SPEED:
        return statState.moveSpeed;
    }
  }

  public getRobotAttributeModifier(
    gameState: Readonly<GameState>,
    robotId: string,
    attributesTypeEnum: AttributesTypeEnum
  ): number {
    const value = this.getRobotAttributeValue(gameState, robotId, attributesTypeEnum);
    return Math.floor((value - 10) / 2);
  }
}

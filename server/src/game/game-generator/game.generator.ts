import {
  ArenaState,
  BaseAttribute,
  EffectState,
  FeatureAttribute,
  GameState,
  GameStateTypeEnum,
  RaisingLevelAttribute,
  ResourceAttribute,
  RobotState,
  TopographyAttribute,
  TurnState,
  TurnStateTypeEnum,
} from 'shared';
import { GameProposal } from '@server/proposal/game-proposal';
import { GameConfig } from '@game/game.config';
import { Game } from '@game/game';

export function createNewGame(gameProposal: GameProposal): Game {
  const width = 10;
  const height = 10;
  const gameConfig: GameConfig = {
    initialGameState: defineGameState(gameProposal, width, height),
    mapWidth: width,
    mapHeight: height,
  };
  return new Game(gameConfig);
}

function defineGameState(gameProposal: GameProposal, mapWidth: number, mapHeight: number): GameState {
  return {
    state: GameStateTypeEnum.PENDING,
    turnState: defineInitialTurnState(),
    arenaState: defineInitialArenaState(mapWidth, mapHeight),
    effects: defineInitialEffectState(),
    robots: defineRobotStates(gameProposal),
  };
}

function defineRobotStates(_gameProposal: GameProposal): Record<string, RobotState> {
  //TODO fetch RobotState[] from gameProposal.logins
  return {
    bast: temp_defineRandomRobot('bast'),
    wass: temp_defineRandomRobot('wass'),
  };
}

function defineInitialTurnState(): TurnState {
  return {
    currentTurnNumber: 0,
    turnStateTypeEnum: TurnStateTypeEnum.PENDING,
    currentTurnRobotId: 'bast',
  };
}

function defineInitialArenaState(mapWidth: number, mapHeight: number): ArenaState {
  return {
    cells: Array.from({ length: mapWidth * mapHeight }).map((_, index) => ({
      id: index.toString(),
      weight: 2,
      visibleByRobotsId: [],
      attributes: {
        baseAttribute: BaseAttribute.GRASS,
        topographyAttribute: TopographyAttribute.FLAT,
        featureAttribute: FeatureAttribute.NONE,
        resourceAttribute: ResourceAttribute.NONE,
        raisingLevelAttribute: RaisingLevelAttribute.LEVEL1,
      },
    })),
  };
}

function defineInitialEffectState(): EffectState[] {
  return [];
}

function temp_defineRandomRobot(name: string): RobotState {
  return {
    id: name,
    name: name,
    attributes: {
      cpu: 10,
      chassis: 10,
      energy: 10,
      interface: 10,
      mobility: 10,
      power: 10,
    },
    resources: {
      remainingMove: 4,
      totalMove: 4,
      coolingDown: 10,
      energyModules: 3,
      mana: 100,
      maxHp: 200,
      maxMana: 100,
      hp: 200,
      isOverheating: false,
      maxOverheating: 100,
      overheating: 0,
      regenHp: 10,
      regenMana: 10,
      remainingActions: 1,
      remainingSubActions: 1,
      shield: 50,
      totalActions: 1,
      totalSubActions: 1,
    },
    selfStates: [],
    coordinates: { x: 0, y: 0, z: 0 },
    statistics: {
      hp: 10,
      accuracy: 10,
      armor: 10,
      critical: 10,
      damage: 10,
      dodge: 10,
      moveSpeed: 10,
      reduction: 10,
    },
  };
}

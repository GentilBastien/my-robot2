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
import { Game } from '@game/game';
import { GameConfig } from '@game/game.config';

export function createNewGame(gameProposal: GameProposal): Game {
  const gameConfig: GameConfig = {
    initialGameState: defineGameState(gameProposal),
    mapHeight: 10,
    mapWidth: 10,
  };
  return new Game(gameConfig);
}

function defineGameState(gameProposal: GameProposal): GameState {
  return {
    state: GameStateTypeEnum.PENDING,
    turnState: defineInitialTurnState(),
    arenaState: defineInitialArenaState(),
    effects: defineInitialEffectState(),
    robots: defineRobotStates(gameProposal),
  };
}

function defineRobotStates(_gameProposal: GameProposal): Record<string, RobotState> {
  //TODO fetch RobotState[] from gameProposal.logins
  return {
    bast: defineRandomRobot('bast'),
    raph: defineRandomRobot('wass'),
  };
}

function defineInitialTurnState(): TurnState {
  return {
    currentTurnNumber: 0,
    turnStateTypeEnum: TurnStateTypeEnum.PENDING,
    currentTurnRobotId: 'bast',
  };
}

function defineInitialArenaState(): ArenaState {
  return {
    cells: Array.from({ length: 100 }).map((_, index) => ({
      id: index.toString(),
      weight: 2,
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

function defineRandomRobot(name: string): RobotState {
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
      totalMove: 20,
      totalSubActions: 1,
    },
    selfStates: [],
    coordinates: { x: 4, y: -3, z: -1 },
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

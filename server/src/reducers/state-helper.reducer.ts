import { CellState, EffectState, GameState, GameStateTypeEnum, ResourcesState, RobotState, TurnState } from 'shared';

export function changeGameStateType(gameState: Readonly<GameState>, gameStateTypeEnum: GameStateTypeEnum): GameState {
  return {
    ...gameState,
    state: gameStateTypeEnum,
  };
}

export function changeRobotState(gameState: Readonly<GameState>, robotState: RobotState): GameState {
  return {
    ...gameState,
    robots: {
      ...gameState.robots,
      [robotState.id]: robotState,
    },
  };
}

export function changesResourcesState(
  gameState: Readonly<GameState>,
  robotId: string,
  resourcesState: ResourcesState
): GameState {
  return {
    ...gameState,
    robots: {
      ...gameState.robots,
      [robotId]: {
        ...gameState.robots[robotId],
        resources: resourcesState,
      },
    },
  };
}

export function changeCellState(gameState: Readonly<GameState>, cellState: CellState): GameState {
  return {
    ...gameState,
    arenaState: {
      ...gameState.arenaState,
      cells: {
        ...gameState.arenaState.cells,
        [cellState.id]: cellState,
      },
    },
  };
}

export function changeTurnState(gameState: Readonly<GameState>, turnState: TurnState): GameState {
  return {
    ...gameState,
    turnState,
  };
}

export function addEffectState(gameState: Readonly<GameState>, effectState: EffectState): GameState {
  return {
    ...gameState,
    effects: [...gameState.effects, effectState],
  };
}

export function removeEffectState(gameState: Readonly<GameState>, effectStateId: string): GameState {
  return {
    ...gameState,
    effects: gameState.effects.filter(effectState => effectState.id !== effectStateId),
  };
}

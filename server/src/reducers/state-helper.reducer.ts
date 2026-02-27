import { CellState, EffectState, GameState, GameStateTypeEnum, RobotState, TurnState } from 'shared';

export function updateGameStateType(gameState: Readonly<GameState>, gameStateTypeEnum: GameStateTypeEnum): GameState {
  return {
    ...gameState,
    state: gameStateTypeEnum,
  };
}

export function updateRobotState(gameState: Readonly<GameState>, robotState: RobotState): GameState {
  return {
    ...gameState,
    robots: {
      ...gameState.robots,
      [robotState.id]: robotState,
    },
  };
}

export function updateCellState(gameState: Readonly<GameState>, cellState: CellState): GameState {
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

export function updateTurnState(gameState: Readonly<GameState>, turnState: TurnState): GameState {
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

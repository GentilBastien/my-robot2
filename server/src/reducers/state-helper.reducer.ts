import { CellState, GameState, GameStateTypeEnum, RobotState, TurnState } from 'shared';

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

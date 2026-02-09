import { EffectInstance } from '@entities/effects/effect-instance';
import { CellState, GameState, GameStateTypeEnum, RobotState, TurnState } from 'shared';

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

export function addEffectState(gameState: Readonly<GameState>, effectInstance: EffectInstance): GameState {
  return {
    ...gameState,
    effectState: {
      ...gameState.effectState,
      activeEffects: {
        ...gameState.effectState.activeEffectIds,
        [effectInstance.id]: effectInstance,
      },
    },
  };
}

export function removeEffectState(gameState: Readonly<GameState>, effectInstanceId: string): GameState {
  return {
    ...gameState,
    effectState: {
      ...gameState.effectState,
      activeEffectIds: gameState.effectState.activeEffects.filter(e => e !== effectInstanceId),
    },
  };
}

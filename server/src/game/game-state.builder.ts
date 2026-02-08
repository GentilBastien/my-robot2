import { GameState } from '@states/game.state';
import { RobotState } from '@states/robot.state';
import { TurnState } from '@states/turn.state';
import { EffectInstance } from '@entities/effects/effect-instance';

export function changeRobotState(gameState: Readonly<GameState>, robotState: RobotState): GameState {
  return {
    ...gameState,
    robots: {
      ...gameState.robots,
      [robotState.id]: robotState,
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
        ...gameState.effectState.activeEffects,
        [effectInstance.id]: effectInstance,
      },
    },
  };
}

export function removeEffectState(gameState: Readonly<GameState>, effectInstanceId: string): GameState {
  const { [effectInstanceId]: effectToRemove, ...remainingEffects } = gameState.effectState.activeEffects;
  return {
    ...gameState,
    effectState: {
      ...gameState.effectState,
      activeEffects: remainingEffects,
    },
  };
}

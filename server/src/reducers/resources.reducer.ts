import { GameState, Reducer, ResourcesState } from 'shared';

export const updateResourcesState =
  (robotId: string, resourcesState: ResourcesState): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
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
  };

export const remainingMovementReducer =
  (robotId: string, newRemainingMovement: number): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    return {
      ...gameState,
      robots: {
        ...gameState.robots,
        [robotId]: {
          ...gameState.robots[robotId],
          resources: {
            ...gameState.robots[robotId].resources,
            remainingMove: newRemainingMovement,
          },
        },
      },
    };
  };

export const hpReducer =
  (robotId: string, newHp: number): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    return {
      ...gameState,
      robots: {
        ...gameState.robots,
        [robotId]: {
          ...gameState.robots[robotId],
          resources: {
            ...gameState.robots[robotId].resources,
            hp: newHp,
          },
        },
      },
    };
  };

export const manaReducer =
  (robotId: string, newMana: number): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    return {
      ...gameState,
      robots: {
        ...gameState.robots,
        [robotId]: {
          ...gameState.robots[robotId],
          resources: {
            ...gameState.robots[robotId].resources,
            mana: newMana,
          },
        },
      },
    };
  };

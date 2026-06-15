import { GameState, Reducer, ResourcesState } from 'shared';

export const updateResourcesState =
  (robotId: string, newResourcesState: ResourcesState): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    return {
      ...gameState,
      robots: {
        ...gameState.robots,
        [robotId]: {
          ...gameState.robots[robotId],
          resources: newResourcesState,
        },
      },
    };
  };

export const remainingActionsReducer =
  (robotId: string, newRemainingActions: number): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    return {
      ...gameState,
      robots: {
        ...gameState.robots,
        [robotId]: {
          ...gameState.robots[robotId],
          resources: {
            ...gameState.robots[robotId].resources,
            remainingActions: newRemainingActions,
          },
        },
      },
    };
  };

export const remainingSubActionsReducer =
  (robotId: string, newRemainingSubActions: number): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    return {
      ...gameState,
      robots: {
        ...gameState.robots,
        [robotId]: {
          ...gameState.robots[robotId],
          resources: {
            ...gameState.robots[robotId].resources,
            remainingSubActions: newRemainingSubActions,
          },
        },
      },
    };
  };

export const energyModulesReducer =
  (robotId: string, newEnergyModules: number): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    return {
      ...gameState,
      robots: {
        ...gameState.robots,
        [robotId]: {
          ...gameState.robots[robotId],
          resources: {
            ...gameState.robots[robotId].resources,
            energyModules: newEnergyModules,
          },
        },
      },
    };
  };

export const remainingMovementReducer =
  (robotId: string, newRemainingMove: number): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    return {
      ...gameState,
      robots: {
        ...gameState.robots,
        [robotId]: {
          ...gameState.robots[robotId],
          resources: {
            ...gameState.robots[robotId].resources,
            remainingMove: newRemainingMove,
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

export const shieldReducer =
  (robotId: string, shieldCost: number): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    return {
      ...gameState,
      robots: {
        ...gameState.robots,
        [robotId]: {
          ...gameState.robots[robotId],
          resources: {
            ...gameState.robots[robotId].resources,
            shield: gameState.robots[robotId].resources.shield - shieldCost,
          },
        },
      },
    };
  };

export const hpAndShieldReducer =
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
            shield: 0,
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

export const heatReducer =
  (robotId: string, newOverheating: number): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    return {
      ...gameState,
      robots: {
        ...gameState.robots,
        [robotId]: {
          ...gameState.robots[robotId],
          resources: {
            ...gameState.robots[robotId].resources,
            overheating: newOverheating,
          },
        },
      },
    };
  };

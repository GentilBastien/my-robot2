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

export const shieldReducer =
  (robotId: string, newShield: number): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    return {
      ...gameState,
      robots: {
        ...gameState.robots,
        [robotId]: {
          ...gameState.robots[robotId],
          resources: {
            ...gameState.robots[robotId].resources,
            shield: newShield,
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

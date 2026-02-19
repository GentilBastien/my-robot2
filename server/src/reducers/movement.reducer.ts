import { GameState, Reducer, ResourcesState } from 'shared';
import { changesResourcesState } from './state-helper.reducer';

export const remainingMovementReducer =
  (robotId: string, newRemainingMovement: number): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    const currentResourcesState = gameState.robots[robotId].resources;
    const newResourcesState: ResourcesState = {
      ...currentResourcesState,
      remainingMove: newRemainingMovement,
    };
    return changesResourcesState(gameState, robotId, newResourcesState);
  };

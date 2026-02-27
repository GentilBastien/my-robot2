import { GameState, Reducer, ResourcesState } from 'shared';
import { changesResourcesState } from './state-helper.reducer';

export const healthPointReducer =
  (robotId: string, hpRegen: number): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    const current: ResourcesState = gameState.robots[robotId].resources;
    const newTurnState: ResourcesState = {
      ...current,
      hp: current.hp + hpRegen,
    };
    return changesResourcesState(gameState, robotId, newTurnState);
  };

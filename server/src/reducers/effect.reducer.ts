import { EffectState, GameState, Reducer } from 'shared';

export const addEffectState =
  (effectState: EffectState): Reducer =>
  (gameState: Readonly<GameState>): GameState => ({
    ...gameState,
    effects: [...gameState.effects, effectState],
  });

export const removeEffectState =
  (effectStateId: string): Reducer =>
  (gameState: Readonly<GameState>): GameState => ({
    ...gameState,
    effects: gameState.effects.filter(effectState => effectState.id !== effectStateId),
  });

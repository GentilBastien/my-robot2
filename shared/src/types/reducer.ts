import { GameState } from '../states/game.state';

/**
 * A reducer is an effective modification function of the {@link GameState}.
 * It reads a {@link GameState} in input and returns a new {@link GameState} as output.
 */
export type Reducer = (readonlyGameState: Readonly<GameState>) => GameState;

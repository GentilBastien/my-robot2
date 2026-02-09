import { GameState } from '../states/game.state';

export type Reducer = (readonlyGameState: Readonly<GameState>) => GameState;

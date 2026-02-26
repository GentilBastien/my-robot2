import { RobotState } from './robot.state';
import { GameStateTypeEnum } from '../enums/game-state-type.enum';
import { ArenaState } from './arena.state';
import { EffectState } from './effect.state';
import { TurnState } from './turn.state';

export interface GameState {
  robots: Record<string, RobotState>;
  state: GameStateTypeEnum;
  arenaState: ArenaState;
  effects: EffectState[];
  turnState: TurnState;
}

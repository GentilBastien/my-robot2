import { GameStateTypeEnum } from 'shared';
import { TurnState } from '@states/turn-state';
import { ArenaState } from '@states/arena-state';
import { EffectState } from '@states/effect-state';
import { RobotState } from '@states/robot.state';

export interface GameState {
  robots: RobotState[];
  state: GameStateTypeEnum;
  arenaState: ArenaState;
  effectState: EffectState;
  turnState: TurnState;
}

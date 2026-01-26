import { GameStateTypeEnum } from 'shared';
import { TurnState } from '@states/turn-state';
import { ArenaState } from '@states/arena-state';
import { EffectState } from '@states/effect-state';
import { Robot } from '@entities/robot/robot';

export interface GameState {
  robots: Robot[];
  state: GameStateTypeEnum;
  arenaState: ArenaState;
  effectState: EffectState;
  turnState: TurnState;
}

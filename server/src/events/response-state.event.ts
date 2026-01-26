import { GameEventTypeEnum, StateEventTypeEnum } from 'shared';
import { Robot } from '@entities/robot/robot';
import { GameEvent } from '@events/game.events';

export interface ResponseStateEvent extends GameEvent {
  gameEventType: GameEventTypeEnum.RESPONSE_STATE;
  stateEventType: StateEventTypeEnum;
}

export interface DamageResponseStateEvent extends ResponseStateEvent {
  stateEventType: StateEventTypeEnum.DAMAGE;
  source: Robot;
  target: Robot;
  damageDealt: number;
  isDodged: boolean;
  isCritical: boolean;
  armorEfficiency: number;
}

export interface RobotDestroyedResponseStateEvent extends ResponseStateEvent {
  stateEventType: StateEventTypeEnum.ROBOT_DESTROYED;
  robot: Robot;
}

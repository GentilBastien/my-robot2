import { GameEventTypeEnum } from 'shared';
import { Robot } from '@entities/robot/robot';

export interface GameEvent {
  gameEventType: GameEventTypeEnum;
  priority?: number;
}

export interface TurnGameEvent extends GameEvent {
  gameEventType: GameEventTypeEnum.TURN_START | GameEventTypeEnum.TURN_END;
  turnNumber: number;
  turnRobot: Robot;
}

export interface NextTurnGameEvent extends GameEvent {
  gameEventType: GameEventTypeEnum.NEXT_TURN;
  nextTurnNumber: number;
  nextTurnRobot: Robot;
}

export interface RobotJoinedGameEvent extends GameEvent {
  gameEventType: GameEventTypeEnum.ROBOT_JOINED;
  robot: Robot;
}

export interface RobotDestroyedGameEvent extends GameEvent {
  gameEventType: GameEventTypeEnum.ROBOT_DESTROYED;
  robot: Robot;
}

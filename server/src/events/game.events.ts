import { Coordinates, GameEventTypeEnum } from 'shared';
import { RobotState } from '@states/robot.state';

export interface GameEvent {
  gameEventType: GameEventTypeEnum;
  priority?: number;
}

export interface TurnGameEvent extends GameEvent {
  gameEventType: GameEventTypeEnum.TURN_START | GameEventTypeEnum.TURN_END;
  turnNumber: number;
  turnRobotId: string;
}

export interface AdvanceTurnGameEvent extends GameEvent {
  gameEventType: GameEventTypeEnum.ADVANCE_TURN;
  turnNumberAdvanced: number;
  turnRobotIdAdvanced: string;
}

export interface RobotJoinedGameEvent extends GameEvent {
  gameEventType: GameEventTypeEnum.ROBOT_JOINED;
  coordinates: Coordinates;
  robot: RobotState;
}

export interface RobotDestroyedGameEvent extends GameEvent {
  gameEventType: GameEventTypeEnum.ROBOT_DESTROYED;
  robot: RobotState;
}

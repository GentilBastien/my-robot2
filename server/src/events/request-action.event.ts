import { ActionEventTypeEnum, DamageTypeEnum, GameEventTypeEnum } from 'shared';
import { RobotState } from '@states/robot.state';
import { RequestEvent } from '@events/request.event';

export interface RequestActionEvent extends RequestEvent {
  gameEventType: GameEventTypeEnum.ACTION;
  actionEventType: ActionEventTypeEnum;
  source: RobotState;
}

// ----------
// UNEXPORTED
// ----------

interface TargetedEvent {
  target: RobotState;
}

interface ZoneEvent {
  targetTileId: string;
  radius: number;
}

interface OverTimeEvent {
  totalTurns: number;
  stackable: boolean;
  maxStacks: number;
  refreshDuration: number;
}

interface DamageEvent {
  damageType: DamageTypeEnum;
  damage: number;
}

// --------
// EXPORTED
// --------

export interface AutoAttackRequestActionEvent extends RequestEvent, DamageEvent, TargetedEvent {
  damageType: DamageTypeEnum.ENERGETIC;
}

import { ActionEventTypeEnum, DamageTypeEnum } from 'shared';
import { RequestStateEvent } from '@events/request-state.event';

export interface ActionRequestStateEvent extends RequestStateEvent {
  actionEventTypeEnum: ActionEventTypeEnum;
}

// ----------
// UNEXPORTED
// ----------

interface TargetedEvent {
  targetRobotId: string;
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

export interface AutoAttackRequestActionEvent extends RequestStateEvent, DamageEvent, TargetedEvent {
  damageType: DamageTypeEnum.ENERGETIC;
}

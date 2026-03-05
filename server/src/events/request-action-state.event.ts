import { ActionTypeEnum, DamageTypeEnum } from 'shared';
import { RequestStateEvent } from '@events/request-state.event';

export interface RequestActionStateEvent extends RequestStateEvent {
  actionTypeEnum: ActionTypeEnum;
}

// ----------
// UNEXPORTED
// ----------

interface TargetedEvent {
  targetRobotId: string;
}

interface ZoneEvent {
  targetCellId: string;
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

export interface RequestAutoAttackActionEvent extends RequestActionStateEvent, DamageEvent, TargetedEvent {
  actionTypeEnum: ActionTypeEnum.AUTO_ATTACK;
  damageType: DamageTypeEnum.ENERGETIC;
}

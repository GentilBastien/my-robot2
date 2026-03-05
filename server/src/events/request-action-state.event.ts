import { ActionTypeEnum, DamageTypeEnum } from 'shared';
import { RequestStateEvent } from '@events/request-state.event';

export interface RequestActionStateEvent extends RequestStateEvent {
  actionTypeEnum: ActionTypeEnum;
}

// ------------------------------
// ACTION SUBTYPES, NOT EXPORTED
// ------------------------------

interface TargetedAction extends RequestActionStateEvent {
  targetRobotId: string;
}

interface ZoneAction extends RequestActionStateEvent {
  targetCellId: string;
  radius: number;
}

interface DamageAction extends RequestActionStateEvent {
  damageType: DamageTypeEnum;
  damage: number;
}

interface UpgradedAction extends RequestActionStateEvent {
  hasEnergyModule: boolean;
}

// ------------------------------
// ACTION SUBTYPE CHECKS, EXPORTED
// ------------------------------

export function isTargetedAction(
  requestActionStateEvent: RequestActionStateEvent
): requestActionStateEvent is TargetedAction {
  return 'targetRobotId' in requestActionStateEvent;
}

export function isZoneAction(requestActionStateEvent: RequestActionStateEvent): requestActionStateEvent is ZoneAction {
  return 'targetCellId' in requestActionStateEvent && 'radius' in requestActionStateEvent;
}

export function isDamageAction(
  requestActionStateEvent: RequestActionStateEvent
): requestActionStateEvent is DamageAction {
  return 'damageType' in requestActionStateEvent && 'damage' in requestActionStateEvent;
}

export function isUpgradedAction(
  requestActionStateEvent: RequestActionStateEvent
): requestActionStateEvent is UpgradedAction {
  return 'hasEnergyModule' in requestActionStateEvent;
}

// ------------------------------
// ACTION TYPES, EXPORTED
// ------------------------------

export interface RequestAutoAttackActionEvent extends DamageAction, TargetedAction, UpgradedAction {
  actionTypeEnum: ActionTypeEnum.AUTO_ATTACK;
  damageType: DamageTypeEnum.ENERGETIC;
}

import { ActionTypeEnum, DamageTypeEnum } from 'shared';
import { RequestEvent } from '@events/request.event';

export interface ActionRequestEvent extends RequestEvent {
  actionTypeEnum: ActionTypeEnum;
}

// ------------------------------
// ACTION SUBTYPES, NOT EXPORTED
// ------------------------------

interface TargetedAction extends ActionRequestEvent {
  targetRobotId: string;
}

interface ZoneAction extends ActionRequestEvent {
  targetCoordinates: string;
  radius: number;
}

interface DamageAction extends ActionRequestEvent {
  damageType: DamageTypeEnum;
  damage: number;
}

interface UpgradedAction extends ActionRequestEvent {
  hasEnergyModule: boolean;
}

// ------------------------------
// ACTION TYPES, EXPORTED
// ------------------------------

export interface AutoAttackActionRequestEvent extends DamageAction, TargetedAction, UpgradedAction {
  actionTypeEnum: ActionTypeEnum.AUTO_ATTACK;
  damageType: DamageTypeEnum.ENERGETIC;
}

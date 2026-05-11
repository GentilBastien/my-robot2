import { ActionTypeEnum, DamageTypeEnum } from 'shared';
import { RequestEvent } from '@events/request.event';

export interface ActionRequestEvent extends RequestEvent {
  actionTypeEnum: ActionTypeEnum;
}

export interface TargetedAction extends ActionRequestEvent {
  targetRobotId: string;
}

export interface ZoneAction extends ActionRequestEvent {
  targetCoordinates: string;
  radius: number;
}

export interface DamageAction extends ActionRequestEvent {
  damageType: DamageTypeEnum;
  damage: number;
}

export interface UpgradedAction extends ActionRequestEvent {
  hasEnergyModule: boolean;
}

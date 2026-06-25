import { ActionTypeEnum } from 'shared';
import { RequestEvent } from '@events/request.event';
import { ResponseEvent } from '@events/response.event';
import { SourceEvent } from '@events/source.event';

export interface ActionRequestEvent extends RequestEvent {
  actionTypeEnum: ActionTypeEnum;
  hasEnergyModule: boolean;
}

export interface ActionResponseEvent extends ResponseEvent {
  actionTypeEnum: ActionTypeEnum;
}

export interface TargetedAction extends SourceEvent {
  targetRobotId: string;
}

export interface ZoneAction extends SourceEvent {
  targetCoordinates: string;
  radius: number;
}

export interface DamageAction extends SourceEvent {
  damage: number;
}

export interface HealAction extends SourceEvent {
  heal: number;
}

export interface ShieldAction extends SourceEvent {
  heal: number;
}

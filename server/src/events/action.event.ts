import { ActionEventTypeEnum, GameEventTypeEnum } from 'shared';
import { RobotState } from '@states/robot.state';
import { RequestEvent } from '@events/request.event';

export interface RequestActionEvent extends RequestEvent {
  gameEventType: GameEventTypeEnum.ACTION;
  actionEventType: ActionEventTypeEnum;
  source: RobotState;
}

// --------
// UNEXPORTED
// --------

interface RequestTargetedActionEvent extends RequestActionEvent {
  target: RobotState;
}

interface RequestZoneActionEvent extends RequestActionEvent {
  targetTileId: string;
  radius: number;
}

//
// interface OverTimeGameEvent extends TargetedGameEvent {
//   totalTurns: number;
// }
//
// interface ThrowGrenadeGameEvent extends AOEGameEvent {
//   baseDamage: number;
// }
//
// // --------
// // EXPORTED
// // --------
//
// export interface AutoAttackGameEvent extends TargetedGameEvent {
//   damageType: DamageTypeEnum.ENERGETIC;
//   baseDamage: number;
// }
//
// export interface FireAutoAttackGameEvent extends AutoAttackGameEvent, OverTimeGameEvent {
//   fireDamage: number;
//   refreshDuration: boolean;
// }
//
// export interface ThrowPlasmaGrenadeGameEvent extends ThrowGrenadeGameEvent {
//   actionEventType: ActionEventTypeEnum.THROW_PLASMA_GRENADE;
//   damageType: DamageTypeEnum.FIRE;
// }
//
// export interface ThrowEMPGrenadeGameEvent extends ThrowGrenadeGameEvent {
//   actionEventType: ActionEventTypeEnum.THROW_PLASMA_GRENADE;
//   damageType: DamageTypeEnum.EMP;
// }

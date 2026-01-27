import { ActionEventTypeEnum, DamageTypeEnum, GameEventTypeEnum } from 'shared';
import { RobotState } from '@states/robot.state';
import { TileState } from '@states/tile-state';
import { GameEvent } from '@events/game.events';

export interface ActionEvent extends GameEvent {
  gameEventType: GameEventTypeEnum.ACTION;
  actionEventType: ActionEventTypeEnum;
  source: RobotState;
}

// --------
// UNEXPORTED
// --------

interface TargetedGameEvent extends ActionEvent {
  target: RobotState;
}

interface AOEGameEvent extends ActionEvent {
  targetCell: TileState;
  radius: number;
}

interface OverTimeGameEvent extends TargetedGameEvent {
  totalTurns: number;
}

interface ThrowGrenadeGameEvent extends AOEGameEvent {
  baseDamage: number;
}

// --------
// EXPORTED
// --------

export interface AutoAttackGameEvent extends TargetedGameEvent {
  damageType: DamageTypeEnum.ENERGETIC;
  baseDamage: number;
}

export interface FireAutoAttackGameEvent extends AutoAttackGameEvent, OverTimeGameEvent {
  fireDamage: number;
  refreshDuration: boolean;
}

export interface ThrowPlasmaGrenadeGameEvent extends ThrowGrenadeGameEvent {
  actionEventType: ActionEventTypeEnum.THROW_PLASMA_GRENADE;
  damageType: DamageTypeEnum.FIRE;
}

export interface ThrowEMPGrenadeGameEvent extends ThrowGrenadeGameEvent {
  actionEventType: ActionEventTypeEnum.THROW_PLASMA_GRENADE;
  damageType: DamageTypeEnum.EMP;
}

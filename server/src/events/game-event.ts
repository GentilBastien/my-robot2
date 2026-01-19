import { DamageTypeEnum, GameEventTypeEnum } from 'shared';
import { Robot } from '../states/robot';
import { Tile } from '../tiles/tile';

export interface GameEvent {
  gameEventType: GameEventTypeEnum;
  source: Robot;
}

// --------
// UNEXPORTED
// --------

interface TargetedGameEvent extends GameEvent {
  target: Robot;
}

interface AOEGameEvent extends GameEvent {
  targetCell: Tile;
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
  gameEventType: GameEventTypeEnum.THROW_PLASMA_GRENADE;
  damageType: DamageTypeEnum.FIRE;
}

export interface ThrowEMPGrenadeGameEvent extends ThrowGrenadeGameEvent {
  gameEventType: GameEventTypeEnum.THROW_PLASMA_GRENADE;
  damageType: DamageTypeEnum.EMP;
}

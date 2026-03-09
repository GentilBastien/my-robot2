import { EffectState, GameEventTypeEnum, MovementTypeEnum, PathCoordinate, StepPathCoordinate } from 'shared';
import { GameEvent } from '@events/game.event';
import { DamageTypeEnum } from 'shared/src/enums/damage-type.enum';

export interface RequestStateEvent extends GameEvent {
  priority?: number;
}

export interface RequestTurnStartStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.TURN_START;
}

export interface RequestTurnEndStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.TURN_END;
}

export interface RequestAdvanceTurnStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.ADVANCE_TURN;
}

export interface RequestPathStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.PATH;
  movementType: MovementTypeEnum;
  path: PathCoordinate;
}

export interface RequestStepPathStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.STEP_PATH;
  movementType: MovementTypeEnum;
  stepPath: StepPathCoordinate;
}

export interface RequestResourcesStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.RESOURCES;
}

export interface RequestAddEffectStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.ADD_EFFECT;
  effectState: EffectState;
}

export interface RequestRemoveEffectStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.REMOVE_EFFECT;
  effectStateId: string;
}

export interface RequestHpStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.HP;
  value: number;
}

export interface RequestManaStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.MANA;
  value: number;
}

export interface RequestHeatStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.HEAT;
  value: number;
}

export interface RequestDamageStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.DAMAGE;
  damageType: DamageTypeEnum;
  targetRobotId: string;
  baseDamage: number;
}

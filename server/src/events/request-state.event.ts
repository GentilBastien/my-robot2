import {
  Coordinates,
  DamageTypeEnum,
  EffectState,
  GameEvent,
  GameEventTypeEnum,
  MovementTypeEnum,
  StepPathCostCoordinate,
} from 'shared';

export interface RequestStateEvent extends GameEvent {
  priority?: number;
}

export interface RequestTurnStartStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.TURN_START;
}

export interface RequestTurnEndStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.TURN_END;
}

export interface RequestRobotDestroyedStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.ROBOT_DESTROYED;
  targetRobotId: string;
  cause: string;
}

export interface RequestPathStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.PATH;
  movementType: MovementTypeEnum;
  path: Coordinates[];
}

export interface RequestStepPathStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.STEP_PATH;
  movementType: MovementTypeEnum;
  stepPath: StepPathCostCoordinate;
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

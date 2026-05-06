import {
  DamageTypeEnum,
  EffectState,
  GameEvent,
  GameEventTypeEnum,
  MovementTypeEnum,
  PathCostCoordinate,
  StepPathCostCoordinate,
} from 'shared';

export interface ResponseStateEvent extends GameEvent {
  responseValidated: boolean;
}

export interface TurnStartResponseStateEvent extends ResponseStateEvent {
  gameEventType: GameEventTypeEnum.TURN_START;
  turnNumber: number;
  turnRobotId: string;
}

export interface TurnEndResponseStateEvent extends ResponseStateEvent {
  gameEventType: GameEventTypeEnum.TURN_END;
  turnNumber: number;
  turnRobotId: string;
}

export interface RobotDestroyedResponseStateEvent extends ResponseStateEvent {
  gameEventType: GameEventTypeEnum.ROBOT_DESTROYED;
  targetRobotId: string;
  cause: string;
}

export interface PathResponseStateEvent extends ResponseStateEvent {
  gameEventType: GameEventTypeEnum.PATH;
  movementType: MovementTypeEnum;
  path: PathCostCoordinate;
}

export interface StepPathResponseStateEvent extends ResponseStateEvent {
  gameEventType: GameEventTypeEnum.STEP_PATH;
  movementType: MovementTypeEnum;
  stepPath: StepPathCostCoordinate;
}

export interface ResourcesResponseStateEvent extends ResponseStateEvent {
  gameEventType: GameEventTypeEnum.RESOURCES;
}

export interface AddEffectResponseStateEvent extends ResponseStateEvent {
  gameEventType: GameEventTypeEnum.ADD_EFFECT;
  effectState: EffectState;
}

export interface RemoveEffectResponseStateEvent extends ResponseStateEvent {
  gameEventType: GameEventTypeEnum.REMOVE_EFFECT;
  effectStateId: string;
}

export interface HpResponseStateEvent extends ResponseStateEvent {
  gameEventType: GameEventTypeEnum.HP;
  value: number;
}

export interface ManaResponseStateEvent extends ResponseStateEvent {
  gameEventType: GameEventTypeEnum.MANA;
  value: number;
}

export interface HeatResponseStateEvent extends ResponseStateEvent {
  gameEventType: GameEventTypeEnum.HEAT;
  value: number;
}

export interface DamageResponseStateEvent extends ResponseStateEvent {
  gameEventType: GameEventTypeEnum.DAMAGE;
  targetRobotId: string;
  damageType: DamageTypeEnum;
  damageDealt: number;
  isDodged: boolean;
  isCritical: boolean;
  armorEfficiency: number;
}

import { StateEventTypeEnum } from 'shared';

export interface ResponseStateEvent {
  stateEventType: StateEventTypeEnum;
}

// export interface DamageResponseGameEvent extends GameEvent {
//   eventType: GameEventTypeEnum.DAMAGE_RESPONSE;
//   source: Robot;
//   target: Robot;
//   damageDealt: number;
//   isDodged: boolean;
//   isCritical: boolean;
//   armorEfficiency: number;
// }

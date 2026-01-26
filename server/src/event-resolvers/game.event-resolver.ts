import { GameState } from '@states/game-state';
import { RequestStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum } from 'shared';
import { GameEvent } from '@events/game.events';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';

export class GameEventResolver {
  public static resolve(
    readonlyGameState: Readonly<GameState>,
    gameEvent: GameEvent,
    pendingGameEvents: PriorityListStructure<GameEvent>
  ): RequestStateEvent | null {
    switch (gameEvent.gameEventType) {
      case GameEventTypeEnum.ACTION: {
        // return ActionEventResolver.resolveAction(gameState, gameEvent as ActionEvent); return RequestStateEvent
        return null;
      }
      case GameEventTypeEnum.TURN_START: {
        return null;
      }
      default:
        return null;
    }
  }

  // private static startTurn(readonlyGameState: Readonly<GameState>): RequestStateEvent {
  //   return {};
  // }
  //
  // private static endTurn(readonlyGameState: Readonly<GameState>): RequestStateEvent {
  //   return [];
  // }
  //
  // private static advanceTurn(readonlyGameState: Readonly<GameState>): RequestStateEvent {
  //   return [];
  // }
  //
  // private static resolveFireAutoAttack(
  //   readonlyGameState: Readonly<GameState>,
  //   action: FireAutoAttackGameEvent
  // ): RequestStateEvent {
  //   const damageRequestStateEvent: DamageRequestStateEvent = {
  //     stateEventType: StateEventTypeEnum.DAMAGE,
  //     damageType: DamageTypeEnum.ENERGETIC,
  //     target: action.target,
  //     source: action.source,
  //     baseDamage: action.baseDamage,
  //   };
  //   const effInstance: EffectInstance = {
  //     id: crypto.randomUUID(),
  //     source: action.source,
  //     target: action.target,
  //     effect: new EffectFire(),
  //     stacks: 1,
  //     remainingTurns: action.totalTurns,
  //   };
  //   const effectFireRequest: AddEffectRequestStateEvent = {
  //     stateEventType: StateEventTypeEnum.ADD_EFFECT,
  //     effectInstance: effInstance,
  //   };
  //   //effectFireRequest must be reemited
  //   return damageRequestStateEvent;
  // }
  // private static resolveThrowFireGrenade(
  //   readOnlyGameState: Readonly<GameState>,
  //   action: ThrowPlasmaGrenadeGameEvent
  // ): RequestStateEvent[] {
  //   return [];
  // }
}

// export class ActionEventResolver {
//   public static resolve(game: GameState, gameEvent: ActionEvent): RequestStateEvent[] {
//     switch (gameEvent.actionEventType) {
//       case ActionEventTypeEnum.THROW_PLASMA_GRENADE: {
//         return this.resolveThrowFireGrenade(game, gameEvent as ThrowPlasmaGrenadeGameEvent);
//       }
//       default:
//         return [];
//     }
//   }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// }

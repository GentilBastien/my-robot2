import { Game } from '../states/game';
import { DamageTypeEnum, GameEventTypeEnum, StateEventTypeEnum } from 'shared';
import { EffectInstance } from '../entities/effects/effect-instance';
import { EffectFire } from '../entities/effects/in-game-effects/effect-fire';
import { FireAutoAttackGameEvent, GameEvent, ThrowPlasmaGrenadeGameEvent } from '../events/game-event';
import { AddEffectRequestStateEvent, DamageRequestStateEvent, RequestStateEvent } from '../events/request-state-event';

export function resolveGameEvent(game: Game, gameEvent: GameEvent): RequestStateEvent[] {
  switch (gameEvent.gameEventType) {
    case GameEventTypeEnum.THROW_PLASMA_GRENADE: {
      return resolveThrowFireGrenade(game, gameEvent as ThrowPlasmaGrenadeGameEvent);
    }
    default:
      return [];
  }
}

export function resolveFireAutoAttack(game: Game, action: FireAutoAttackGameEvent): RequestStateEvent[] {
  const damageRequestStateEvent: DamageRequestStateEvent = {
    stateEventType: StateEventTypeEnum.DAMAGE,
    damageType: DamageTypeEnum.ENERGETIC,
    target: action.target,
    source: action.source,
    baseDamage: action.baseDamage,
  };
  const effInstance: EffectInstance = {
    id: crypto.randomUUID(),
    source: action.source,
    target: action.target,
    effect: new EffectFire(),
    stacks: 1,
    remainingTurns: action.totalTurns,
  };
  const effectFireRequest: AddEffectRequestStateEvent = {
    stateEventType: StateEventTypeEnum.ADD_EFFECT,
    effectInstance: effInstance,
  };
  return [damageRequestStateEvent, effectFireRequest];
}

export function resolveThrowFireGrenade(game: Game, action: ThrowPlasmaGrenadeGameEvent): RequestStateEvent[] {
  return [];
}

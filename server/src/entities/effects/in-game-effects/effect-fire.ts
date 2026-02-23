import { Effect, EffectStackingConfig, EffectTickingConfig } from '../effect';
import { EffectCategoryTypeEnum } from 'shared';
import { RequestStateEvent } from '@events/request-state.event';
import { EffectContext } from '@entities/effects/effect-context';
import { EffectTrigger } from '@entities/effects/effect-trigger';

export class EffectFire implements Effect {
  public type: EffectCategoryTypeEnum = EffectCategoryTypeEnum.NEGATIVE;

  public ticking: EffectTickingConfig = {
    totalTurns: 5,
    everyTurn: true,
    atApply: true,
  };

  public stacking: EffectStackingConfig = {
    enabled: true,
    maxStacks: 5,
    refreshDuration: true,
  };

  // public onApply(effectInstance: EffectInstance): RequestStateEvent[] {
  //   // const addEffectRequest: AddEffectRequestStateEvent = {
  //   //   gameEventType: GameEventTypeEnum.REQUEST_STATE,
  //   //   stateEventType: StateEventTypeEnum.ADD_EFFECT,
  //   //   effectInstance: effectInstance,
  //   // };
  //   // return [addEffectRequest];
  //   return [];
  // }
  //
  // public onTurnStart(effectInstance: EffectInstance): RequestStateEvent[] {
  //   // const damageIntent: DamageRequestStateEvent = {
  //   //   stateEventType: StateEventTypeEnum.DAMAGE,
  //   //   damageType: DamageTypeEnum.FIRE,
  //   //   sourceId: effectInstance.sourceId,
  //   //   targetId: effectInstance.targetId,
  //   //   baseDamage: 1,
  //   // };
  //   // return [damageIntent];
  //   return [];
  // }
  //
  // public onTurnEnd(_: EffectInstance): RequestStateEvent[] {
  //   return [];
  // }
  //
  // public onEveryTurnStart(effectInstance: EffectInstance): RequestStateEvent[] {
  //   return [];
  // }
  //
  // public onEveryTurnEnd(effectInstance: EffectInstance): RequestStateEvent[] {
  //   return [];
  // }
  //
  // public onExpire(effectInstance: EffectInstance): RequestStateEvent[] {
  //   // const addEffectRequest: RemoveEffectRequestStateEvent = {
  //   //   gameEventType: GameEventTypeEnum.REQUEST_STATE,
  //   //   stateEventType: StateEventTypeEnum.REMOVE_EFFECT,
  //   //   effectInstance: effectInstance,
  //   // };
  //   return [];
  // }
  //
  // onAction(effectInstance: EffectInstance): RequestStateEvent[] {
  //   return [];
  // }

  handle(context: EffectContext): RequestStateEvent[] {
    switch (context.trigger) {
      case EffectTrigger.ON_APPLY:
      case EffectTrigger.ON_ACTION:
      case EffectTrigger.ON_TURN_START:
      case EffectTrigger.ON_TURN_END:
      case EffectTrigger.ON_EVERY_TURN_START:
      case EffectTrigger.ON_EVERY_TURN_END:
      case EffectTrigger.ON_EXPIRE:
      default:
        return [];
    }
  }
}

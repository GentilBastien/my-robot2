import { Effect, EffectStackingConfig, EffectTickingConfig } from '@entities/effects/effect';
import { EffectCategoryTypeEnum } from 'shared';
import { EffectContext } from '@entities/effects/effect-context';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { RequestEvent } from '@events/request.event';
import { EffectRemoveRequestEvent } from '@events/effect-remove/effect-remove.request-event';

/**
 * Handler methods should not call each other.
 */
export abstract class AbstractEffect implements Effect {
  private readonly _type: EffectCategoryTypeEnum;
  private readonly _ticking: EffectTickingConfig;
  private readonly _stacking: EffectStackingConfig;

  protected constructor(type: EffectCategoryTypeEnum, ticking: EffectTickingConfig, stacking: EffectStackingConfig) {
    this._type = type;
    this._ticking = ticking;
    this._stacking = stacking;
  }

  protected generalHandle(effContext: EffectContext): RequestEvent[] {
    const effState = effContext.effectState;
    effState.remainingTurns = effState.remainingTurns - 1;
    effState.lastedTurns = effState.lastedTurns + 1;

    const requestEvents: RequestEvent[] = [];
    if (effContext.effectState.remainingTurns <= 0) {
      requestEvents.push(new EffectRemoveRequestEvent(effContext.effectState.sourceRobotId, effContext.effectState.id));
    }
    return requestEvents;
  }

  protected onApply = (effectContext: EffectContext): RequestEvent[] => {
    console.log(effectContext);
    return [];
  };

  protected onAction = (effectContext: EffectContext): RequestEvent[] => {
    console.log(effectContext);
    return [];
  };

  protected onWalk = (effectContext: EffectContext): RequestEvent[] => {
    console.log(effectContext);
    return [];
  };

  protected onTurnStart = (effectContext: EffectContext): RequestEvent[] => {
    console.log(effectContext);
    return [];
  };

  protected onTurnEnd = (effectContext: EffectContext): RequestEvent[] => {
    console.log(effectContext);
    return [];
  };

  protected onExpire = (effectContext: EffectContext): RequestEvent[] => {
    console.log(effectContext);
    return [];
  };

  public handle(context: EffectContext): RequestEvent[] {
    switch (context.trigger) {
      case EffectTrigger.ON_APPLY:
        return this.onApply(context);
      case EffectTrigger.ON_ACTION:
        return this.onAction(context);
      case EffectTrigger.ON_WALK:
        return this.onWalk(context);
      case EffectTrigger.ON_TURN_START:
        return this.onTurnStart(context);
      case EffectTrigger.ON_TURN_END:
        return this.onTurnEnd(context);
      case EffectTrigger.ON_EXPIRE:
        return this.onExpire(context);
      default:
        return [];
    }
  }

  public get type(): EffectCategoryTypeEnum {
    return this._type;
  }

  public get ticking(): EffectTickingConfig {
    return this._ticking;
  }

  public get stacking(): EffectStackingConfig {
    return this._stacking;
  }
}
